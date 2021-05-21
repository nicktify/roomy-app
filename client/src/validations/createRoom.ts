export const createRoomValidations = (name: string) => {
  let errors = {
    name: '',
  };

  if (name.length < 3) {
    errors.name = 'Name should be longer than 2 characters.';
  }

  return errors;
};