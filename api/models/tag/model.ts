import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

import { SyModel } from "../../core/models/SyModel";
import { Field, Register } from "../../core/lib";
import { ORM } from "../../settings";

@Register
export default class Tag extends SyModel<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  @Field({
    type: DataTypes.STRING(255),
    allowNull: false,
    verbose: "Tag Name",
  })
  public name!: string;
}

Tag.init(
  {
    ...SyModel.metaFields,
    ...Tag.fields,
  },
  {
    tableName: "tags",
    sequelize: ORM.database,
  }
);
