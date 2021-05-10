export const authValidations = (formValues: { email: string, password: string }) => {
  let errors = {
    email: "",
    password: "",
  };

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValues.email)) {
    errors.email = "Email is invalid";
  }

  
  let passwordHaveLowerCase = false;
  let passwordHaveUpperCase = false;
  let passwordHaveNumber = false;

  for (let i = 0; i < formValues.password.length; i ++) {
    if (!isNaN(parseInt(formValues.password[i]))) {
      passwordHaveNumber = true;
    }
      if (formValues.password[i] == formValues.password[i].toUpperCase()) {
        console.log('here')
        passwordHaveUpperCase = true;
      }
      else passwordHaveUpperCase = false;
      if (formValues.password[i] == formValues.password[i].toLowerCase()) passwordHaveLowerCase = true;
      else passwordHaveLowerCase = false;
      passwordHaveNumber = false;
  }
  
  if (!formValues.password) {
    errors.password = "Password is required";
  } else if (
    formValues.password.length > 20 ||
    formValues.password.length < 6 ||
    passwordHaveUpperCase == false ||
    passwordHaveLowerCase == false ||
    passwordHaveNumber == false
  ) {
    errors.password = "Password should be longer than six characters and shorter than twenty characters. It must include an upper case and a number.";
  }

  return errors;
};