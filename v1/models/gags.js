var mongoose = require("mongoose");

var gagSchema = new mongoose.Schema({
    title: String,
    image: String,
    info: {type: String, default: Date.now()},
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Gag", gagSchema);