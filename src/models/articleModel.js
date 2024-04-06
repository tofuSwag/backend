const mongoose = require('mongoose')
const articleSchema = require('../schemas/articleSchema')

// compiling model
// collections will be lowercase in db, but uppercase in our variables
const Article = mongoose.model('article', articleSchema) 

module.exports = Article