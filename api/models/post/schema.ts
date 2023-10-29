import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  authorId: Yup.number().integer().required("Author ID is required"),

  title: Yup.string()
    .max(255, "Title must be at most 255 characters")
    .required("Title is required"),

  content: Yup.string().required("Content is required"),

  publishedAt: Yup.date().required("Published At is required"),

  status: Yup.string()
    .oneOf(["draft", "published", "archived"], "Invalid status")
    .required("Status is required"),

  highlighted: Yup.boolean().required("Highlighted is required"),

  thumbnailUrl: Yup.string().nullable().url("Invalid URL format"),
});

export default PostSchema;
