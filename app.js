var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

console.log("working");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect('mongodb+srv://admin-akshat:test123@questions.bh5qg.mongodb.net/coding?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var questionSchema = new mongoose.Schema({
    number: Number,
    name: String,
    difficulty: Number,
    algorithm: String,
    description: String,
    code: String
});

var Question = mongoose.model("question", questionSchema);
Question.find({}, function(err, blogs) {
    if (err) {
        console.log(err);
    } else {
        console.log("here");
        // console.log(blogs);
    }
})

// app routes

app.get('/', function(req, res) {
    Question.find({}, function(err, question) {
        if (err) {
            console.log(err);
        } else {
            res.render(__dirname + "/views/index.ejs", { db: question });
        }
    })
    // res.render(__dirname + "/views/index.ejs", { db: Question.find({}) });
});

app.get('/form1', function(req, res) {
    res.render(__dirname + "/views/form1.ejs");
});

var ques = {};

app.post('/form1', function(req, res) {
    ques = {};
    ques.name = req.body.name;
    ques.difficulty = req.body.difficulty;
    ques.algorithm = req.body.algorithm;
    ques.description = req.body.description;
    ques.code = " ";
    // console.log(ques);
    // Question.find({}, function(err, question){
    //  console.log(question);
    // })
    res.redirect('/form2');
});

app.get('/form2', function(req, res) {
    // console.log("form2 get route")
    res.render(__dirname + "/views/form2.ejs");
});

app.post('/form2', function(req, res) {
    ques.code = req.body.code;
    Question.create(ques);
    // console.log("form 2 post route");
    res.redirect('/');
});

app.get('/description/:id', function(req, res) {
    Question.findOne({ _id: req.params.id }, function(err, question) {
        res.render(__dirname + "/views/description.ejs", { description: question.description, id: req.params.id });
    });

});

app.get('/code/:id', function(req, res) {
    Question.findOne({ _id: req.params.id }, function(err, question) {
        res.render(__dirname + "/views/code.ejs", { code: question.code, id: req.params.id });
    });
});

app.get('/code/edit/:id', function(req, res) {
    Question.findOne({ _id: req.params.id }, function(err, question) {
        res.render(__dirname + "/views/code-edit.ejs", { code: question.code, id: req.params.id });
    });
});

app.post('/code/edit/:id', function(req, res) {
    Question.updateOne({_id: req.params.id}, {$set: req.body}, function (){
        console.log("saved");
    });
    res.redirect('/');
});

app.get('/description/edit/:id', function(req, res) {
    Question.findOne({ _id: req.params.id }, function(err, question) {
        res.render(__dirname + "/views/description-edit.ejs", { description: question.description, id: req.params.id });
    });
});

app.post('/description/edit/:id', function(req, res) {
    Question.updateOne({_id: req.params.id}, {$set: req.body}, function (){
        console.log("saved");
    });
    res.redirect('/');
});

app.post('/delete/:id', function(req,res){
    console.log("in delete section");
    Question.deleteOne({_id: req.params.id}, function (err){
        console.log(err);
    });
    console.log("deleted");
    res.redirect("/");
});

app.get('/*', function(req, res) {
    res.send("Page not found. lol");
});

app.listen(process.env.PORT || 3000, function(err, req) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on port 3000");
    }
});