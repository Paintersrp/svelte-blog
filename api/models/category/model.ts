import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

import { SyModel } from "../../core/models/SyModel";
import { Field } from "../../core/lib";
import { ORM } from "../../settings";

export default class Category extends SyModel<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  @Field({
    type: DataTypes.STRING(255),
    allowNull: false,
    verbose: "Category Name",
  })
  public name!: string;
}

Category.init(
  {
    ...SyModel.metaFields,
    ...Category.fields,
  },
  {
    tableName: "categories",
    sequelize: ORM.database,
  }
);
