import Koa from "koa";
import { SyRoutes } from "../../core/routes";
import { PostController } from "./controller";
import { Register } from "../../core/lib";

@Register
export default class PostRoutes extends SyRoutes<PostController> {
  constructor(app: Koa) {
    super(new PostController(app.context.logger), "posts", app, "v0.1");

    this.router.post(`/upload`, this.controller.upload);
    this.router.post(`/delete-images`, this.controller.deleteImages);
    this.addRoutesToApp(app);
  }
}
