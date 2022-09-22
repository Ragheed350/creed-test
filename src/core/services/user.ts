import { faker } from "@faker-js/faker";
import { User } from "../models";

export const user = {
  createUser(): User {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  },
  async fetch(): Promise<User[]> {
    return Array.from(Array(10)).map(() => this.createUser());
  },
};
