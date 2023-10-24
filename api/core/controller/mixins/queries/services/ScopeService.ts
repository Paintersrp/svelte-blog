import { FindOptions } from "sequelize";

import { server } from "../../../../../server";
import { BadRequestError } from "../../../../errors/client";

/**
 * Service class for managing field selection and model associations in database queries.
 */
export class ScopeService {
  /**
   * Adds specific fields to the provided FindOptions to filter the attributes of the models returned in the response.
   *
   * @param {FindOptions} findOptions - Sequelize find options to which the field conditions will be added.
   * @param {string} [fields] - A comma-separated string of field names to be included in the response.
   */
  public addFields(findOptions: FindOptions, fields?: string): void {
    if (fields) {
      findOptions.attributes = fields.split(",");
    }
  }

  /**
   * Adds associations of related models to the provided FindOptions to fetch related models along with the main model.
   *
   * @param {FindOptions} findOptions - Sequelize find options to which the associations will be added.
   * @param {string} [includes] - A comma-separated string representing the names of the associated models to be included.
   */
  public addIncludes(findOptions: FindOptions, includes?: string): void {
    const includeFields = includes?.split(",");
    if (includeFields) {
      findOptions.include = includeFields.map((includeField) => {
        const nestedIncludeMatch = includeField.match(/^(\w+)\[(\w+)\]$/);
        if (nestedIncludeMatch) {
          const [_, parentModelName, nestedModelName] = nestedIncludeMatch;
          const parentModel = server.ORM.database.models[parentModelName];
          const nestedModel = server.ORM.database.models[nestedModelName];
          if (!parentModel || !nestedModel) {
            throw new BadRequestError(
              `Invalid model name: ${
                parentModel ? nestedModelName : parentModelName
              }`
            );
          }
          return {
            model: parentModel,
            include: [nestedModel],
          };
        } else {
          // Handle regular include
          const model = server.ORM.database.models[includeField];
          if (!model) {
            throw new BadRequestError(`Invalid model name: ${includeField}`);
          }
          return model;
        }
      });
    }
  }
}
