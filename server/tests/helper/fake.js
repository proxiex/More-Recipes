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
  noEmailUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: '11110000',
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