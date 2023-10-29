import { Logger } from "pino";
import { SyController } from "../../core/controller";
import Comment from "./model";
import CommentSchema from "./schema";
import Router from "koa-router";

export class CommentController extends SyController {
  constructor(logger: Logger) {
    super({ model: Comment, schema: CommentSchema, logger });
  }

  public async create(ctx: Router.RouterContext): Promise<void> {
    return this.transactionManager.performTransaction(
      ctx,
      "create",
      this.mixins.create
    );
  }
}
