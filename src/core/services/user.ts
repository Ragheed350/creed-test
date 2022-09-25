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
    return new Promise((resolve) => {
      return setTimeout(() => resolve(Array.from(Array(50)).map(() => this.createUser())), 1000);
    });
  },
  async justPromise() {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(console.log("Loading...")), 1000);
    });
  },
};
