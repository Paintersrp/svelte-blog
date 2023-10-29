import Koa from "koa";
import { SyRoutes } from "../../core/routes";
import { TagController } from "./controller";

export default class TagRoutes extends SyRoutes<TagController> {
  constructor(app: Koa) {
    super(new TagController(app.context.logger), "tags", app, "v0.1");
  }
}
