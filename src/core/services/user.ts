import { faker } from "@faker-js/faker";
import { User } from "../models";

export const user = {
  createUser(): User {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      company: faker.company.name(),
    };
  },
  async fetch(): Promise<User[]> {
    return Array.from(Array(50)).map(() => this.createUser());
  },
};
