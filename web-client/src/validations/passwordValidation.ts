export const passwordValidation = (password: string, repeatedPassword: string) => {
  let errors = {
    password: '',
    passwordMatch: '',
  }

  if (!password) errors.password = 'Password should not by empty.'
  else errors.password = ''

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || password.length < 6 || password.length > 19) {
    errors.password = 'Password should be longer than 5 characters and less than 20 characters should have at least one lowercase, one uppercase, and one number'
  }
  else errors.password = ''

  if (password !== repeatedPassword) errors.passwordMatch = 'Passwords should be equal.'
  else errors.passwordMatch = ''

  return errors;
}