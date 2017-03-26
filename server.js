let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require("body-parser");
let logger = require("morgan");
let Comment = require("./models/Comment.js");
let Article = require("./models/Article.js");
let request = require("request");
let cheerio = require("cheerio");
mongoose.Promise = Promise;

let app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect("mongodb://localhost/newsScraperData");
let db = mongoose.connection;

let port = process.env.PORT || 4500;
app.use(express.static(__dirname + '/public'));

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.get('/api/',function(req,res) {
    res.send('Working');
});

app.get("/scrape", function(req, res) {
    request("http://www.echojs.com/", function(error, response, html) {
        let $ = cheerio.load(html);
        $("article h2").each(function(i, element) {

            let result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            let entry = new Article(result);

            entry.save(function(err, doc) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(doc);
                }

            });
        });
    });
});

app.get('/api/articles', function(req,res) {
    Article.find({},function(err,docs) {
        if(err) {
            res.send(error);
        }
        else {
            res.send(docs);
        }
    });
});

app.post("/api/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  let newComment = new Comment(req.body);
    console.log(newComment);

  // And save the new note the db
  newComment.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.update({ "_id": req.params.id }, {$push:{comments:{$each: [doc], $position: 0}}})
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});
app.listen(port);
