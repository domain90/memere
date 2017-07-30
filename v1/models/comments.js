var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    info: {type: String, default: Date.now()},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply"
        },
    ],
    votes: {type: Number, default: 1}
});

module.exports = mongoose.model("Comment", commentSchema);