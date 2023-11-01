import Router from "koa-router";
import { Logger } from "pino";
import { InferCreationAttributes } from "sequelize";

import { SyController } from "../../controller/SyController";
import { AuthResponses, UserResponses } from "../../lib";
import { JWTAuthService } from "../../auth/jwt";
import { UserService } from "../../auth/user";

import { User } from "./model";
import { UserSchema } from "./schema";

/**
 * @class UserController
 *
 * @classdesc The UserController class extends the SyController class and handles
 * HTTP requests related to user authentication and user management.
 * This includes user registration, login, logout, and token management.
 *
 * @example
 * const userController = new UserController(pino());
 * userRouter.post('/register', userController.validateUserBody, userController.register);
 * userRouter.post('/login', userController.login);
 * userRouter.post('/logout', userController.logout);
 * userRouter.post('/refresh_token', userController.refresh_token);
 *
 * @extends {SyController}
 */
export class UserController extends SyController {
  private methodsToBind = [
    "register",
    "login",
    "logout",
    "refresh_token",
    "salt",
    "validateUserBody",
  ];

  /**
   * @desc Constructs a new instance of the UserController class, initializes it with the
   * User model, UserSchema for validation, and the provided logger instance.
   * Binds the specified methods to the current instance.
   *
   * @param {Logger} logger - The instance of application logger to be used by this controller.
   */
  constructor(logger: Logger) {
    super({ model: User, schema: UserSchema, logger });

    this.bindMethods(this.methodsToBind);
  }

  /**
   * @async
   * @method validateUserBody
   * @desc Validates the user request body against the UserSchema.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   * @param {() => Promise<any>} next - The next function in the middleware chain.
   */
  async validateUserBody(ctx: Router.RouterContext, next: () => Promise<any>) {
    const fields = ctx.request.body as InferCreationAttributes<User>;

    console.log(fields);

    if (fields) {
      try {
        await this.validate(fields);
        await next();
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = { message: "Invalid request body", error: error };
      }
    }
  }

  /**
   * @async
   * @method register
   * @desc Handles the user registration request. If successful, sends a success message.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   */
  async register(ctx: Router.RouterContext): Promise<void> {
    const fields = ctx.request.body as InferCreationAttributes<User>;

    if (fields) {
      try {
        await User.create(fields);
        ctx.body = AuthResponses.SUCCESS("Registration");
        ctx.status = 200;
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          message: AuthResponses.FAIL("Registration"),
          error: error,
        };
      }
    }
  }

  /**
   * @async
   * @method login
   * @desc Handles the user login request. If successful, sets cookies and sends tokens.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   */
  async login(ctx: Router.RouterContext) {
    const { username, password } = ctx.request.body as {
      [key: string]: string;
    };

    const hasToken = await JWTAuthService.checkForToken(ctx);

    if (hasToken) {
      ctx.status = 403;
      ctx.body = { message: AuthResponses.LOGGED_IN };
      return;
    }

    try {
      const user = await UserService.getByUsername(username);

      if (!user) {
        ctx.throw(401, UserResponses.NOT_FOUND(username));
      }

      console.log(password, user.password);

      // Request password is hashed and salt checked on the FE before delivery
      const isValidPassword = password === user.password;

      if (!isValidPassword) {
        const isUnhashedPassword = await UserService.comparePassword(
          password,
          user.password
        );

        if (!isUnhashedPassword) {
          ctx.throw(401, AuthResponses.INVALID_PASSWORD);
        }
      }

      if (user.refreshToken) {
        const isBlacklisted = await JWTAuthService.isBlacklisted(
          user.refreshToken
        );

        if (!isBlacklisted) {
          const decodedOriginalRefresh = JWTAuthService.decode(
            user.refreshToken
          );
          if (decodedOriginalRefresh) {
            await JWTAuthService.addToBlacklist(user.refreshToken);
          }
        }
      }

      const userDTO = { id: user.id, username: user.username, role: user.role };
      const accessToken = await JWTAuthService.sign(userDTO);
      const refreshToken = await JWTAuthService.signRefresh({
        username: user.username,
      });

      await JWTAuthService.setCookies(ctx, accessToken, refreshToken);

      user.refreshToken = refreshToken;
      await user.save();

      ctx.body = { ...userDTO, accessToken, refreshToken };
      ctx.status = 200;
    } catch (error: any) {
      this.logger.error(error);
      ctx.status = 500;
      ctx.body = {
        message: AuthResponses.FAIL("Login"),
        error: error.message,
      };
    }
  }

  /**
   * @async
   * @method refresh_token
   * @desc Handles the token refresh request. If successful, sets a new access token.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   */
  async refresh_token(ctx: Router.RouterContext) {
    const { refreshToken } = ctx.request.body as { [key: string]: string };
    const originalAccessToken = ctx.cookies.get("jwt");

    if (originalAccessToken) {
      try {
        const decodedToken = await JWTAuthService.verify(refreshToken);

        if (decodedToken) {
          const user = await UserService.getByUsername(decodedToken.username);

          if (user && user.refreshToken === refreshToken) {
            const accessToken = await JWTAuthService.sign(user);
            await JWTAuthService.setCookies(ctx, accessToken, refreshToken);
            await JWTAuthService.addToBlacklist(originalAccessToken);

            ctx.body = { accessToken };
            ctx.status = 200;
          } else {
            ctx.status = 401;
            ctx.body = AuthResponses.TOKEN_EXPIRED;
          }
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = AuthResponses.TOKEN_ERROR;
      }
    }
  }

  /**
   * @async
   * @method logout
   * @desc Handles the user logout request. Clears cookies and blacklists tokens.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   */
  async logout(ctx: Router.RouterContext) {
    const accessToken = ctx.cookies.get("jwt");
    const refreshToken = ctx.cookies.get("refreshToken");

    if (accessToken) {
      await JWTAuthService.addToBlacklist(accessToken);
    }

    if (refreshToken) {
      await JWTAuthService.addToBlacklist(refreshToken);
    }

    try {
      JWTAuthService.clearCookies(ctx);
      ctx.body = AuthResponses.SUCCESS("Logout");
      ctx.status = 200;
    } catch (erorr) {
      ctx.status = 500;
      ctx.body = AuthResponses.FAIL("Logout");
    }
  }

  /**
   * @async
   * @method logout
   * @desc Handles the user logout request. Clears cookies and blacklists tokens.
   *
   * @param {Router.RouterContext} ctx - The context of the request.
   */
  async salt(ctx: Router.RouterContext) {
    const { username } = ctx.request.body as {
      [key: string]: string;
    };

    const hasToken = await JWTAuthService.checkForToken(ctx);

    if (hasToken) {
      ctx.status = 403;
      ctx.body = { message: AuthResponses.LOGGED_IN };
      return;
    }

    try {
      const user = await UserService.getByUsername(username);

      if (user) {
        ctx.body = { salt: user.salt };
        ctx.status = 200;
      } else {
        ctx.body = { message: UserResponses.NOT_FOUND(username) };
      }
    } catch (error: any) {
      this.logger.error(error);
      ctx.status = 500;
      ctx.body = {
        message: AuthResponses.FAIL("Salt"),
        error: error.message,
      };
    }
  }
}
