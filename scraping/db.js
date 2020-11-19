const mongoose = require('mongoose')
const articleSchema = require('./schemas/articleSchema')
const ammendSchema = require('./schemas/ammendSchema')
// const db_url = "mongodb://localhost/a"
const db_url = process.env.db_url || "mongodb+srv://kidnikid:utlra_mega_spicy_theeki_mirchi@espicehuntingpractice-qwqid.mongodb.net/wakeup?retryWrites=true&w=majority"

mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true })
.then( () => console.log("Connected to DB"))
.catch(err => console.error(err))

// compiling model
// collections will be lowercase in db, but uppercase in our variables
const Article = mongoose.model('article', articleSchema) 
const Ammend = mongoose.model('ammend', ammendSchema)


module.exports.Article = Article
module.exports.Ammend = Ammend