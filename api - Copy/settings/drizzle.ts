import { WatcherConfig } from "../core/server/managers/drizzle/types";
import { generateModel } from "../drizzle/generateModel";
import { generatePage } from "../drizzle/generatePage";
import generateFields from "../drizzle/generateModelPour";

export default {
  watchers: [
    {
      path: "../../frontend/src/pages",
      type: "newDir",
    },
    {
      path: "../models",
      type: "newDir",
      pragma: {
        drizzle: {
          model: generateModel,
          page: generatePage,
        },
        pour: {
          fields: generateFields,
        },
      },
    },
  ],
} as WatcherConfig;
