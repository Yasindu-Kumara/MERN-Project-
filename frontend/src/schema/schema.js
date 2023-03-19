import * as Yup from "yup";

const deviceSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});

export { deviceSchema };
