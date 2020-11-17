const axios = require('axios');
const express = require('express')
const app = express()
const port = PROCESS.ENV.PORT || 3000
const _ = require('lodash')

app.get('/getNews', async (req, res) => {
    try {
        articles = await getNews()
        res.send(articles)

    }
    catch(err) {
        console.error(err)
        res.status(500)
        res.send('An error occured in the /getNews endpoint handler')
    }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
/*
- Food Waste
- Biodiversity Loss
- Pollution 
- Deforestation
- Global Warming / Climate change
- Food and Water Insecurity
*/

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getNews() {
    /* 
    Use /v2/everything
    */
    let apikey = "009dc0c908d54a30859d80e6f8f3085f"
    const options = {
        headers: {'X-Api-Key': apikey}
      };
    //  encodeURIComponent(string)
    let phrase = "Food Waste"
    // let domains = "timesofindia.indiatimes.com"
    // let domains = "nytimes.com"
    // let domains = "timesofindia.indiatimes.com"
    // let 
    let query = phrase
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`
    try {
        const response = await axios.get(url, options);
        articles = (response.data.articles);
        articles.forEach((article, index) => {
            articles[index] = _.pick(article, ['source', 'title', 'author', 'url', 'urlToImage', 'content', 'description'])
        })
        
        return articles

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while executing the getNews endpoint.')
    }
}

// /v2/sources

async function getSources() {
    /* 
    Use /v2/everything
    */
    let apikey = "009dc0c908d54a30859d80e6f8f3085f"
    const options = {
        headers: {'X-Api-Key': apikey}
      };
    let url = "https://newsapi.org/v2/sources?language=en&apiKey=009dc0c908d54a30859d80e6f8f3085f"
    try {
        const response = await axios.get(url, options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        throw new Error('An error occured while getting sources')
    }
}

getNews()