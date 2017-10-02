import faker from 'faker';

const fakeData = {
  newUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '1111',
    cpassword: '1111'
  },
  noEmailUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: '1111',
    cpassword: '1111'
  },
  noUsernameUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '1111',
    cpassword: '1111'
  },
  nUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '1111',
    cpassword: '1111'
  }
  
};

export default fakeData;