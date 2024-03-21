import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createSingleChat = async (numOfChat) => {
  try {
    const users = await User.find().select("_id");

    const chatPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);
    console.log("chat created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createGroupChat = async (numOfChat) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];

    for (let i = 0; i < numOfChat; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);

        const randomUser = users[randomIndex];

        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }

      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatPromise.push(chat);
    }

    await Promise.all(chatPromise);
    console.log("chat created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const createMessage = async (numOfMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagePromise = [];

    for (let i = 0; i < numOfMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);
    console.log("Message created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessageInAChat = async (chatId, numOfMessages) => {
  try {
    const users = await User.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numOfMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagePromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);
    console.log("Message created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export {
  createSingleChat,
  createGroupChat,
  createMessage,
  createMessageInAChat,
};
