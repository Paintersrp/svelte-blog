import { Logger } from "pino";
import { SyController } from "../../core/controller";
import Post from "./model";
import PostSchema from "./schema";

export class PostController extends SyController {
  constructor(logger: Logger) {
    super({ model: Post, schema: PostSchema, logger });
  }
}
