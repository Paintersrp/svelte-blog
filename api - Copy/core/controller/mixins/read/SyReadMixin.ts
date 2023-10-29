import Router from "koa-router";
import { HttpStatus } from "../../../lib";
import { ControllerMixinOptions } from "../../types";
import { SyMixin } from "../SyMixin";

/**
 * Class providing list-related functionality.
 * @extends SyMixin
 */
export class SyReadMixin extends SyMixin {
  private processed = new WeakSet();

  /**
   * Constructs a new instance of the SyListMixin class.
   * @param {MixinOptions} options - Options for initiating the Mixin class.
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Retrieves all instances of the model with pagination, sorting, and filtering support.
   */
  public async all(ctx: Router.RouterContext) {
    const findOptions = await this.processQueryParams(ctx);
    const { count, rows } = await this.model.findAndCountAll(findOptions);

    console.log(count);

    this.createResponse(ctx, HttpStatus.OK, {
      count,
      data: this.sanitizeData(rows),
    });
  }

  /**
   * Retrieves a specific instance of the model by its ID.
   */
  public async read(ctx: Router.RouterContext) {
    const id = this.processParam(ctx, "id");
    const findOptions = await this.processQueryParams(ctx);
    const item = await this.findItemById(id, findOptions);

    this.createResponse(ctx, HttpStatus.OK, this.sanitizeData(item));
  }

  /**
   * Recursively removes sensitive fields from data.
   */
  // {#if post.Comments.length === 1} comment {:else} comments {/if}

  private sanitizeData(data: any): any {
    const sensitiveFields = ["password", "salt", "refreshToken"];

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeData(item));
    }

    let baseData = data.dataValues || data;

    for (let key in baseData) {
      if (baseData.hasOwnProperty(key)) {
        if (typeof baseData[key] === "object" && baseData[key] !== null) {
          baseData[key] = this.sanitizeData(baseData[key]);
        }
      }
    }

    for (const field of sensitiveFields) {
      if (baseData.hasOwnProperty(field)) {
        delete baseData[field];
      }
    }

    return baseData;
  }
}
