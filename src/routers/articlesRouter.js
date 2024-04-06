const express = require('express')
const router = express.Router()
const Article = require('../models/articleModel')


router.get('/', (req, res) => {
    res.send('Hello World! The actual news is available at `/getNews`')
})


router.get('/getNews', async (req, res) => {
    try {
        articles = await Article.getNews()
        res.send(articles)
    }
    catch(err) {
        console.error(err)
        res.status(500)
        res.send('An error occured in the /getNews endpoint handler')
    }
  
})


module.exports = router