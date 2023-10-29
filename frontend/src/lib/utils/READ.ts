// export abstract class SyMixin {
//   protected model: ModelStatic<any>;
//   protected logger: Logger;
//   protected validator: SyValidator;
//   protected requestProcessor: RequestProcessor;
//   protected queryProcessor: QueryProcessor;
//   protected includes: Array<object>; // <-- New property to store includes

//   constructor(options: ControllerMixinOptions) {
//     this.model = options.model;
//     this.logger = options.logger;

//     this.validator = new SyValidator();
//     this.requestProcessor = new RequestProcessor(this.logger, this.validator);
//     this.queryProcessor = new QueryProcessor(this.model, this.validator);

//     this.includes = this.getIncludeArray(this.model); // <-- Gather includes at construction
//   }

//   // ... rest of your methods ...

//   /**
//    * Constructs an array for the include option based on the associations of the model.
//    *
//    * @param model - The Sequelize model
//    * @returns An array for the include option
//    */
//   private getIncludeArray(model: ModelStatic<any>): Array<object> {
//     return Object.keys(model.associations).map((associationKey) => {
//       const association = model.associations[associationKey];
//       return {
//         model: association.target,
//         as: associationKey
//       };
//     });
//   }
// }
