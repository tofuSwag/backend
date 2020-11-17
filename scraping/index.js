const axios = require('axios');
const express = require('express')
const app = express()
const port = process.env.port || 3000
const _ = require('lodash')
const apikey = "009dc0c908d54a30859d80e6f8f3085f"
const categories = [
    "Pollution",
    "Deforestation", 
    "Food Waste", 
    "Climate change", 
    "Global Warming", 
    "Biodiversity Loss", 
    "Water Scarcity"
]
app.get('/', (req, res) => {
    res.send('aur ji pranam')
})
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


async function getNews() {
    
    const options = {
        headers: {'X-Api-Key': apikey}
    };
    
    
    try {
        /*
        Design choices
        arr.forEach is not async aware
        */
       let articles = []
       
       for (var index = 0; index < categories.length; index++) {
           let category = categories[index]
           let url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apikey}`
           let response = await axios.get(url, options);
           let category_articles = response.data.articles; // array of articles
           
           category_articles = category_articles.map((article) => {
            let tempObj = _.pick(article, ['source', 'title', 'author', 'url', 'urlToImage', 'content', 'description'])
            tempObj['category'] = category
            // console.log(tempObj)
            return tempObj
            })
            
            articles = _.concat(articles, category_articles)
       }
    //    console.log(articles)
       return articles
       
    
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while executing the getNews endpoint.')
    }
}

// /v2/sources

// async getCategoryNewsArr(category) {}

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