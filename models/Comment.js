let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new mongoose.Schema({
    time : { type : Date, default: Date.now },
    author: 'string',
    text: 'string'
});

let Comment = mongoose.model('comment',CommentSchema);

module.exports = Comment;
