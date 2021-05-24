export const isEmailValidation = (email: string) => {
  let errors = {
    email: ''
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    errors.email = 'Not a well formed email adress.';
  }

  return errors;
};