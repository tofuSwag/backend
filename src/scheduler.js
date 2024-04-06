const cron = require('node-cron')
const Article = require('./models/articleModel')

async function execScheduler() {
    try {
        let numArticles = await Article.countDocuments()
        if (numArticles <= 0) {
            console.log()
            Article.addArticlesFromScratch()
            Article.pruneArticles()
        }
        
        //  updating at minute 1 every hou
        await cron.schedule('1 0/3 * * *', () => { 
            // @rahul: revisit this. 
            //  Might need to be an async function, 
            //  await the line below, wrapped by a try-catch
            Article.addArticlesFromScratch()
            Article.pruneArticles()
        })
    }
    catch(err) {
        console.error("Error in execScheduler function", err)
    }
}

function emptyDb() {
    Article.deleteMany({})
    .then("deleted all db objects")
    .catch(err => console.error("Error when calling emptyDb", err))
}


module.exports = execScheduler
