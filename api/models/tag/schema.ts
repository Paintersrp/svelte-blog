import * as Yup from "yup";

const TagSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, "2").max(250, "250"),
});

export default TagSchema;
