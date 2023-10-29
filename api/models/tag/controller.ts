import { Logger } from "pino";
import { SyController } from "../../core/controller";
import Tag from "./model";
import TagSchema from "./schema";

export class TagController extends SyController {
  constructor(logger: Logger) {
    super({ model: Tag, schema: TagSchema, logger });
  }
}
