let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArticleSchema = new mongoose.Schema({
    title: 'string',
    link: 'string',
    comments: [{
        time : { type : Date, default: Date.now },
        author: 'string',
        text: 'string'
    }]
});

let Article = mongoose.model('article',ArticleSchema);

module.exports = Article;
