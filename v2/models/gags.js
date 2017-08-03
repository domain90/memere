var mongoose = require("mongoose");

var gagSchema = new mongoose.Schema({
    title: String,
    image: String,
    info: {type: String, default: Date.now()},
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
        },
    ],
    views: {type: Number, default: 1},
    commentsNumber: Number,
    rating: {type: Number, default: 1}
});

module.exports = mongoose.model("Gag", gagSchema);