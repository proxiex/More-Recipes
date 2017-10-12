import faker from 'faker';

const fakeData = {
  newUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '11110000',
    confirmPassword: '11110000'
  },

  noFirstNameUsers: {
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    confirmPassword: '11110000'
  },

  noLastNameUsers: {
    firstName: faker.name.firstName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    confirmPassword: '11110000'
  },

  noEmailUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: '11110000',
    confirmPassword: '11110000'
  },

  noPasswordUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    confirmPassword: '11110000'
  },
  passMismatchUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111100',
    confirmPassword: '11110000'
  },
  lessPass: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111',
    confirmPassword: '11110000'
  },
  noUsernameUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '11110000',
    confirmPassword: '11110000'
  },
  nUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '11110000',
    confirmPassword: '11110000'
  }
  
};

export default fakeData;