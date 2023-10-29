import * as Yup from "yup";

const CategorySchema = Yup.object().shape({
  name: Yup.string().trim().min(2, "2").max(250, "250"),
});

export default CategorySchema;
