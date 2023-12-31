import Router from "koa-router";
import { Optional, Transaction } from "sequelize";

import { SyMixin } from "../SyMixin";
import { ControllerResponses, HttpStatus } from "../../../lib";
import { ControllerMixinOptions } from "../../types";
// import * as settings from "../../../../settings";

/**
 * SyCreateMixin is a mixin class which extends the abstract SyMixin.
 * It provides functionality for creating instances of a model, including single
 * and bulk creations.
 *
 * @class SyCreateMixin
 * @extends {SyMixin}
 */
export class SyCreateMixin extends SyMixin {
  /**
   * Creates an instance of SyCreateMixin.
   *
   * @param {ControllerMixinOptions} options - The options to initiate the Mixin class.
   * @constructor
   */
  constructor(options: ControllerMixinOptions) {
    super(options);
  }

  /**
   * Creates a new instance of the model.
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async create(
    ctx: Router.RouterContext,
    transaction: Transaction,
    relay: boolean = false
  ) {
    const payload = this.processPayload(ctx) as
      | Optional<any, string>
      | undefined;

    const findOptions = await this.processQueryParams(ctx);

    const item = await this.model.create(payload, {
      transaction,
      context: ctx.state.user,
    } as any);

    const itemWithQuery = await this.findItemById(
      item.id,
      findOptions,
      transaction
    );

    if (relay) {
      return itemWithQuery;
    }

    this.createResponse(
      ctx,
      HttpStatus.CREATED,
      itemWithQuery,
      ControllerResponses.CREATE_SUCCESS(this.getModelName(item))
    );
  }

  /**
   * Creates multiple instances of the model.
   *
   * @param {Router.RouterContext} ctx - The context object from Koa.
   * @param {Transaction} transaction - The Sequelize transaction.
   */
  public async bulkCreate(
    ctx: Router.RouterContext,
    transaction: Transaction,
    includes: any[]
  ) {
    const payload = this.processPayload(ctx, true) as Optional<any, string>[];
    const batchSize = 200;
    const batches = Math.ceil(payload.length / batchSize);
    let createdItems: any[] = [];

    for (let i = 0; i < batches; i++) {
      const batch = payload.slice(i * batchSize, (i + 1) * batchSize);
      const batchItems = await this.model.bulkCreate(batch, {
        transaction,
        include: includes,
      });
      createdItems = [...createdItems, ...batchItems];
    }

    this.createResponse(
      ctx,
      HttpStatus.CREATED,
      createdItems,
      ControllerResponses.CREATE_SUCCESS(
        this.getModelNamePlural(createdItems[0])
      )
    );
  }
}
