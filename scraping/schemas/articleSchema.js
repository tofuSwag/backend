const mongoose = require('mongoose')
const axios = require('axios');
const _ = require('lodash')

const apikey = "0744dcd782004b63a83a55a58ceb9f63" // this.is.rahul.tandon walli

const categories = [
    "Pollution",
    "Deforestation", 
    "Food Waste", 
    "Climate change", 
    "Global Warming", 
    "Biodiversity Loss", 
    "Water Scarcity"
]


const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    url: String,
    tags: String,
    source: Object,
    description: String,
    urlToImage: String,
    publishedAt: Date,
    category: String
});

articleSchema.statics.addArticlesFromScratch = async function() {    
    try {
        /*
        Design choice
        arr.forEach is not async aware
        arr.map would lead to an array of arrays which would need to be processed again
        Hence the simple for-loop where async-await works
        */
       
        const options = { headers: {'X-Api-Key': apikey} };
        let articles = []
       
        for (var index = 0; index < categories.length; index++) {
            let category = categories[index]
            let url = `https://newsapi.org/v2/everything?q=${category}&pageSize=50&apiKey=${apikey}`
            let response = await axios.get(url, options);
            let category_articles = response.data.articles; // array of articles
            
            category_articles = category_articles.map((article) => {
                // let tempObj = _.pick(article, ['source', 'title', 'author', 'url', 'urlToImage', 'content', 'description'])
                
                let tempObj = article

                tempObj['category'] = category
                
                
                return tempObj 
                })
                
                articles = _.concat(articles, category_articles)
        }
        

        articles.forEach(async (article) => {
            try {
                existingArticle = await this.findOne({ url: article.url });
                
                // if there's no previous article with the same URL
                if (!existingArticle) {
                    await this.create(article)
                }
            }
            catch(err) {
                console.error('error in addArticlesFromScratch', err)
            } 
        })
       
    
    } catch (error) {
            console.error(error);
            throw new Error('An error occurred while executing the addArticlesFromScratch')
    }
}

// /v2/sources

// async getCategoryNewsArr(category) {}

articleSchema.statics.getSources = async function() {
    /* 
    Use /v2/everything
    */
    const options = {
        headers: {'X-Api-Key': apikey}
      };
    let url = "https://newsapi.org/v2/sources?language=en&apiKey=009dc0c908d54a30859d80e6f8f3085f"
    try {
        const response = await axios.get(url, options);
    } catch (error) {
        console.error(error);
        throw new Error('An error occured while getting sources')
    }
}

articleSchema.statics.getNews = async function() {
    let articles = await this.find({}, {_id: 0, __v:0})
    return articles

}

articleSchema.statics.pruneArticles = async function() {
    try {
        // all articles with author name null or author name > 55
        await this.deleteMany(
            {$or : [
                // {title: null},
                {author: null },
                {content: null},
                {url: null},
                // {imageURl: null},
                // {tags: null},
                // {source: null},
                {description: null},
                {urlToImage: null},
                // {publishedAt: null},
                // {category: null},
                {
                    $expr: { "$gt": [ { "$strLenCP": "$author" }, 50 ] }
                }
            ]})
    }
    catch (err) {
        console.error('Error while executing pruneNullAuthorArticles of article Schema', err)
    }

}



module.exports = articleSchema