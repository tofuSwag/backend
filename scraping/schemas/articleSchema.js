const mongoose = require('mongoose')
const axios = require('axios');
const _ = require('lodash')
const Ammend = require('../models/ammendModel');
const { random } = require('lodash');

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
    category: String,
    donateLink: String,
    volunteerLink: String
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

articleSchema.statics.assignAmmends = async function() {
    try {

         // getting all ammend models
    let allAmmends = {}
    for(index = 0; index < categories.length; index++) {
        let category = categories[index]
        allAmmends[category] = await Ammend.find({category: category})
    }
    

    let allArticles = await this.find({})
    
    /*
    Chose to use .map because 1-to-1 ratio would  work here
    and it is async-await aware
    */
//    console.log(allArticles)
   for (var index = 0; index < allArticles.length; index++)
   {
        let article = allArticles[index]
        // let random_num = Math.floor(Math.random() * allAmmends.length)
        // console.log(allAmmends)
        let random_ammend = allAmmends[article.category][0];

        article.volunteerLink = random_ammend.volunteerLink
        article.donateLink = random_ammend.donateLink

        if (! article.volunteerLink) {
            article.volunteerLink = random_ammend.donateLink
        }
        else if (! article.donateLink) {

            article.donateLink = random_ammend.volunteerLink
        }
        
        await article.save()
   }
    }
    catch(err) {
        console.error(err)
    }
   

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