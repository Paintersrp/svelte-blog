import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

import { SyModel } from "../../core/models/SyModel";
import { Field, Register } from "../../core/lib";
import { ORM } from "../../settings";

@Register
export default class Comment extends SyModel<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
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
