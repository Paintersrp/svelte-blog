import { Logger } from "pino";
import { SyController } from "../../core/controller";
import Category from "./model";
import CategorySchema from "./schema";

export class CategoryController extends SyController {
  constructor(logger: Logger) {
    super({ model: Category, schema: CategorySchema, logger });
  }
}
