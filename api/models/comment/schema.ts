import * as Yup from "yup";

const CommentSchema = Yup.object().shape({
  content: Yup.string().trim().min(2, "2").max(500, "500"),
  postId: Yup.number(),
  authorIdId: Yup.number(),
});

export default CommentSchema;
