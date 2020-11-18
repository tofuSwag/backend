const express = require('express')
const app = express()
app.use(express.json()); 
const port = process.env.PORT || 3000
const cron = require('node-cron')
const Article = require('./db')
const cors = require('cors')
const homeRouter = require('./homeRouter')

// ...

app.use(cors())
app.use('/', homeRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//  updating at minute 1 and 3 of every hour
function execScheduler() {
    cron.schedule('1,2,3 * * * *', () => {
        Article.addArticlesFromScratch()
        .then(() => console.log('articles added/updated in db'))
        .catch(err => console.error('Error when calling addArticlesFromScratch', err))
    })
    console.log("cron job scheduled")
}

execScheduler()