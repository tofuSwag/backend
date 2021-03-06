const cron = require('node-cron')
const {Ammend} = require('./models/ammendModel')
const {Article} = require('./models/articleModel')


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

module.exports = execScheduler