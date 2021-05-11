export const signInValidation = (formValues: {email: string, password: string}) => {
  let errors = {
    email: "",
    password: "",
  };

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email)) {
    errors.email = "Not a well formed email adress.";
  }

  if (!formValues.password) {
    errors.password = "Password is required";
  } 

  return errors;
};