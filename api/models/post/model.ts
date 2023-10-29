import {
  DataTypes,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { SyModel } from "../../core/models/SyModel";
import { Field } from "../../core/lib";
import { ORM } from "../../settings";
import { User } from "../../core/features/user";
import Category from "../category/model";
import Tag from "../tag/model";
import Comment from "../comment/model";

export default class Post extends SyModel<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  @Field({
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    verbose: "Author ID",
  })
  public authorId!: number;

  @Field({
    type: DataTypes.STRING(255),
    allowNull: false,
    verbose: "Title",
  })
  public title!: string;

  @Field({
    type: DataTypes.TEXT,
    allowNull: false,
    verbose: "Content",
  })
  public content!: string;

  @Field({
    type: DataTypes.DATE,
    allowNull: false,
    verbose: "Published At",
    defaultValue: DataTypes.NOW,
  })
  public publishedAt!: Date;

  @Field({
    type: DataTypes.ENUM("draft", "published", "archived"),
    allowNull: false,
    verbose: "Status",
    defaultValue: "draft",
  })
  public status: string;

  @Field({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    verbose: "Highlighted",
  })
  public highlighted!: boolean;

  @Field({
    type: DataTypes.STRING,
    allowNull: true,
    verbose: "Thumbnail URL",
  })
  public thumbnailUrl!: string | null;

  public getTags: BelongsToManyGetAssociationsMixin<Tag>;
  public setTags: BelongsToManySetAssociationsMixin<Tag, number>;

  public getComments: HasManyGetAssociationsMixin<Comment>;

  public getCategory: BelongsToGetAssociationMixin<Category>;
  public setCategory: BelongsToSetAssociationMixin<Category, number>;

  public getAuthor: BelongsToGetAssociationMixin<User>;
  public setAuthor: BelongsToSetAssociationMixin<User, number>;
}

Post.init(
  {
    ...SyModel.metaFields,
    ...Post.fields,
  },
  {
    indexes: [{ fields: ["publishedAt"] }],
    tableName: "posts",
    sequelize: ORM.database,
  }
);

User.hasMany(Post, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });

Category.hasMany(Post, { foreignKey: "categoryId" });
Post.belongsTo(Category, { foreignKey: "categoryId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.belongsToMany(Tag, { through: "PostTags", foreignKey: "postId" });
Tag.belongsToMany(Post, { through: "PostTags", foreignKey: "tagId" });
