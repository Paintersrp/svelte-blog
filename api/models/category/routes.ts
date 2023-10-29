import Koa from "koa";
import { SyRoutes } from "../../core/routes";
import { CategoryController } from "./controller";
import { Register } from "../../core/lib";

@Register
export default class CategoryRoutes extends SyRoutes<CategoryController> {
  constructor(app: Koa) {
    super(
      new CategoryController(app.context.logger),
      "categories",
      app,
      "v0.1"
    );
  }
}
