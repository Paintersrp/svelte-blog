import Koa from "koa";
import chokidar from "chokidar";

import * as internal from "./settings";
import { SyServer } from "./core/server/SyServer";
import { SETTINGS } from "./settings/settings";
import { APP_CACHE } from "./settings/internal/cache"; // After other internal, after ORM
import { InlineStylesProcessor } from "./core/server/managers/generation/inline-styles/InlineStylesProcessor";
import { User } from "./core/features/user";
import { seedData } from "./utils/seedData";
import CommentRoutes from "./models/comment/routes";
import CategoryRoutes from "./models/category/routes";
import TagRoutes from "./models/tag/routes";
import PostRoutes from "./models/post/routes";
import serve from "koa-static";

const koa = new Koa();
koa.use(serve("./uploads"));

export const server = new SyServer({
  app: koa,
  port: 4000, // env
  logger: internal.APP_LOGGER,
  cache: APP_CACHE,
  ORM: internal.ORM,
  middleware: SETTINGS.MIDDLEWARES,
  routes: [CommentRoutes, CategoryRoutes, PostRoutes, TagRoutes],
  version: SETTINGS.CURRENT_VERSION,
});

let isProcessing = false;
const fileProcessor = new InlineStylesProcessor();
const watcher = chokidar.watch(
  ["../web/test/src/components", "../web/test/src/pages"],
  {
    persistent: true,
  }
);

watcher
  .on("add", async (path) => {
    if (isProcessing) return;
    isProcessing = true;
    await fileProcessor.processFile(path);
    isProcessing = false;
  })
  .on("change", async (path) => {
    if (isProcessing) return;
    isProcessing = true;
    await fileProcessor.processFile(path);
    isProcessing = false;
  });

console.log("Watching for changes...");

// seedData();
