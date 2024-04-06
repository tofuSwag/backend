const cron = require('node-cron')
const { Article } = require('./models/articleModel')

async function execScheduler() {
    try {

    }
    catch(err) {
        console.error("Error in execScheduler function", err)
    }
    //  updating at minute 1 every hour
    await cron.schedule('1 0/3 * * *', () => { 
        Article.addArticlesFromScratch()
        Article.pruneArticles()
    })

}


/*
function emptyDb() {
    Article.deleteMany({})
    .then("deleted all db objects")
    .catch(err => console.error("Error when calling emptyDb", err))
}
*/

Article.addArticlesFromScratch()
.then(res => {
    console.log("Articles added.", res)
    Article.pruneArticles()
})
.then(res => console.log("Articles pruned"))
.catch(err => console.error("Error while adding Artciles From Scratch"))

module.exports = execScheduler
