const mongoose = require('mongoose')
const _ = require('lodash')

// const db_url = process.env.db_url || "mongodb+srv://kidnikid:utlra_mega_spicy_theeki_mirchi@espicehuntingpractice-qwqid.mongodb.net/wakeup?retryWrites=true&w=majority"
const db_url = "mongodb://localhost/a"

const categories = [
    "Pollution",
    "Deforestation", 
    "Food Waste", 
    "Climate change", 
    "Global Warming", 
    "Biodiversity Loss", 
    "Water Scarcity"
]


mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true })
.then( () => console.log("Connected to DB"))
.catch(err => console.error(err))

const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    url: String,
    imageURl: String,
    tags: [ String ],
    // updateStatus: {
    //     type: Object,
    //     default:        
    // }
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
            let url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apikey}`
            let response = await axios.get(url, options);
            let category_articles = response.data.articles; // array of articles
            
            category_articles = category_articles.map((article) => {
                // let tempObj = _.pick(article, ['source', 'title', 'author', 'url', 'urlToImage', 'content', 'description'])
                
                let tempObj = article
                tempObj['category'] = category
                
                // console.log(tempObj)
                
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
        console.log(response.data);
    } catch (error) {
        console.error(error);
        throw new Error('An error occured while getting sources')
    }
}

articleSchema.statics.getNews = async function() {
    let articles = await this.find({}, {_id: 0})
    return articles

}

// compiling model
const Article = mongoose.model('article', articleSchema)

module.exports = Article