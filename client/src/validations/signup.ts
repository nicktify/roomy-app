export const signUpValidation = (email: string, password: string, name: string) => {
  let errors = {
    email: '',
    password: '',
    name: '',
  };

  if (name.length < 3) {
    errors.name = 'Name should be longer than 2 characters.';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    errors.email = 'Not a well formed email adress.';
  }

  if (!password) {
    errors.password = 'Password is required';
  }
  else if (password.length > 20 || password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[1-9]/.test(password)) {
    errors.password = 'Password should have at least one lowercase\none uppercase, and one number.';
  }

  return errors;
};