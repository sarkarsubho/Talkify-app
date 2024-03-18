import { User } from "../models/user.model.js";

const newUser = async (req, res) => {
  const { name, username, bio, password, avatar } = req.body;

  
  // let avatar = {
  //   public_id: "dfdfdf",
  //   url: "kj",
  // };
  // let user = {
  //   name: "chotu",
  //   username: "chotu",
  //   bio: "chotu",
  //   password: "chotu",
  //   avatar,
  // };

  User.c

  res.send("ddf");
};
const login = (req, res) => {
  res.send("ddf");
};

export { login, newUser };
