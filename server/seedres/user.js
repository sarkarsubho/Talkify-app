import { User } from "../models/user.model.js";
import { faker } from "@faker-js/faker";


const createUser = async (numOfUser) => {
  try {
    const userPromise = [];

    for (let index = 0; index < numOfUser; index++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",

        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);

    }
   await Promise.all(userPromise);
    console.log("user created",numOfUser);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// createUser(10)
export {createUser}
