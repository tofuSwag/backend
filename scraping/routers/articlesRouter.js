const express = require('express')
const router = express.Router()
const {Article} = require('../db')


router.get('/', (req, res) => {
    res.send('aur ji pranam')
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