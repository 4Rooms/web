import * as yup from "yup";

const chatSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title should not exceed 50 characters")
    .test("unique-title", "Title must be unique within the room", function (value: string | undefined) {
      if (!value) return true;
      return true;
    }),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description should not exceed 200 characters"),
});

export default chatSchema;
