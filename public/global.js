const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const generateToken = (userData) => {
    const token = jsonwebtoken.sign(
        { 
          _id: userData.id,
          email: userData.email, 
          username: userData.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      )
    return token;  
}

const updateUserToken = async (id, token) => {
    const updateToken = await User.findOneAndUpdate( 
        { _id: id},
        { $set: {"token": token} },
        { upsert: true}
    )
    return updateToken;
}

const verifyUser = async (args) => {
    const { email, password } = args;

    if (email.trim() === "") throw new Error("Email must not be empty");
    if (password === "") throw new Error("Password must not be empty");

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    const correctPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!correctPassword) {
        throw new Error('Incorrect password')
    }

    return user;
}
module.exports = { generateToken, updateUserToken, verifyUser }