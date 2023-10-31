import { Logger } from "pino";
import { SyController } from "../../core/controller";
import Post from "./model";
import PostSchema from "./schema";
import Router from "koa-router";
import { Optional } from "sequelize";
import Tag from "../tag/model";
import Category from "../category/model";
import { HttpStatus } from "../../core/lib";
import { ControllerMessages } from "../../core/messages/services";
import fs from "fs-extra";
import path from "path";

export class PostController extends SyController {
  constructor(logger: Logger) {
    super({ model: Post, schema: PostSchema, logger });

    this.bindMethods(["upload", "deleteImages"]);
  }

  public async create(ctx: Router.RouterContext): Promise<void> {
    const payload = ctx.request.body;
    const tagNames = payload?.tags?.split(",");
    const categoryTitle = payload?.category;
    const thumbnail: any = ctx.request.files?.thumbnailUrl;

    const post = await this.transactionManager.withTransaction(
      ctx,
      async (transaction) => {
        const tags = await Promise.all(
          tagNames?.map(async (tagName: string) => {
            const [tag] = await Tag.findOrCreate({
              where: { name: tagName.trim() },
              transaction,
            });
            return tag;
          }) || []
        );

        const [category] = await Category.findOrCreate({
          where: { name: categoryTitle },
          transaction,
        });

        const post = (await this.mixins.create.create(
          ctx,
          transaction,
          true
        )) as Post;

        if (tags.length > 0) {
          await post.setTags(tags, { transaction });
        }

        if (category) {
          await post.setCategory(category, { transaction });
        }

        if (thumbnail) {
          const thumbnailPath = `./uploads/${thumbnail.newFilename}`;
          post.thumbnailUrl = thumbnailPath;

          await post.save({ transaction });
        }

        return post;
      }
    );

    this.mixins.create.createResponse(
      ctx,
      HttpStatus.CREATED,
      post,
      ControllerMessages.SUCCESS(
        this.mixins.create.getModelName(post),
        "create"
      )
    );
  }

  public async upload(ctx: Router.RouterContext): Promise<void> {
    const files = ctx.request.files;
    const baseUrl = `./uploads/`;

    if (Array.isArray(files)) {
      const imageUrls = files.map((file) => {
        return `${baseUrl}${file.newFilename}`;
      });

      ctx.body = imageUrls;
      ctx.status = 200;
    } else if (files && typeof files === "object") {
      Object.keys(files).forEach((key) => {
        const fileOrFiles = files[key];
        if (Array.isArray(fileOrFiles)) {
          const imageUrls = fileOrFiles.map(
            (file) => `${baseUrl}${file.newFilename}`
          );

          ctx.body = imageUrls;
          ctx.status = 200;
        } else {
          const imageUrl = `${baseUrl}${fileOrFiles.newFilename}`;

          ctx.body = imageUrl;
          ctx.status = 200;
        }
      });
    }
  }

  public async deleteImages(ctx: Router.RouterContext): Promise<void> {
    const { imageUrls } = ctx.request.body;

    for (const url of imageUrls) {
      const filename = url.split("/").pop();

      const filePath = path.join(
        __dirname,
        "../../../frontend/static/uploads",
        filename
      );

      // @todo file not found handling

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    ctx.status = 200;
    ctx.body = { message: "Unused images deleted" };
  }
}
