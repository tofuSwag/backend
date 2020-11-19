const cron = require('node-cron')
const Article = require('./db')


function execScheduler() {
    
    //  updating at minute 1 every hour
    cron.schedule('1 0/3 * * *', () => {
        Article.addArticlesFromScratch()
        .then(() => console.log('articles added/updated in db'))
        .catch(err => console.error('Error when calling addArticlesFromScratch', err))
    })
    console.log("cron job scheduled")
}

/*
function emptyDb() {
    Article.deleteMany({})
    .then("deleted all db objects")
    .catch(err => console.error("Error when calling emptyDb", err))
}
*/

module.exports = execScheduler