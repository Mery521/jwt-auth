const User = require("../models/User");
const { generateToken, updateUserToken, verifyUser } = require("../public/global")
const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  Query: {
    user: async (_, { id }) => { 
      try {
        let user = await User.findOne({ _id: id });
        if (!user) throw new UserInputError("User not found");
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    users: async () => {
      try {
        let user = await User.find();
        if (!user) throw new UserInputError("User not found");
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password } = args;
      try {
        const user = new User({
          username,
          email,
          password: await bcrypt.hash(password, 6),
          token: '',
        })
        
        const result = await user.save();

        const token = generateToken(result);
        return await updateUserToken(result.id, token);
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    login: async (_, args) => {
      try {
        const user = await verifyUser(args);
        const token = generateToken(user);
        return await updateUserToken(user.id, token);
      } catch (err) {
        throw err;
      }
    },
  }
}