import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

import { SyModel } from "../../core/models/SyModel";
import { Field } from "../../core/lib";
import { ORM } from "../../settings";
import { User } from "../../core/features/user";

export default class Comment extends SyModel<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
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
    type: DataTypes.TEXT,
    allowNull: false,
    verbose: "Comment Content",
  })
  public content!: string;

  @Field({
    type: DataTypes.INTEGER,
    allowNull: false,
    verbose: "Post ID",
  })
  public postId!: number;
}

Comment.init(
  {
    ...SyModel.metaFields,
    ...Comment.fields,
  },
  {
    tableName: "comments",
    sequelize: ORM.database,
  }
);

User.hasMany(Comment, { foreignKey: "authorId" });
Comment.belongsTo(User, { foreignKey: "authorId" });
