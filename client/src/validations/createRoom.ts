export const createRoomValidations = (password: string, repeatedPassword: string, name: string) => {
  let errors = {
    name: '',
    password: '',
    repeatedPassword: '',
  };

  if (name.length < 3) {
    errors.name = 'Name should be longer than 2 characters.';
  }

  if (!password) {
    errors.password = 'Password is required';
  } 
  else if (
    password.length > 20    ||
    password.length < 6     ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[1-9]/.test(password)
  ) {
    errors.password = 'Password is invalid';
  }

  if (password !== repeatedPassword) {
    errors.repeatedPassword = 'Passwords not match'
  }

  return errors;
};