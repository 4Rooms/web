import * as yup from "yup";

export default yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .max(50, "Title should not exceed 50 characters")
        .test(
            "unique-title",
            "Title must be unique within the room",
            function (value) {
                if (!value) return true;
                return true;
            }
        ),
    description: yup
        .string()
        .required("Description is required")
        .max(200, "Description should not exceed 200 characters"),
});
