import Koa from "koa";
import { SyRoutes } from "../../core/routes";
import { CommentController } from "./controller";
import { Register } from "../../core/lib";

@Register
export default class CommentRoutes extends SyRoutes<CommentController> {
  constructor(app: Koa) {
    super(new CommentController(app.context.logger), "comments", app, "v0.1");
  }
}
