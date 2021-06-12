const { Schema, model } = require("mongoose");

const userSchema = new Schema(
   {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        token: {
            type: String
        }
    }
);

module.exports = model("User", userSchema);
