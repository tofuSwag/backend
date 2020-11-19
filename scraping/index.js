const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
app.use(express.json()); 
app.use(cors())


const execScheduler = require('./scheduler')
const articlesRouter = require('./routers/articlesRouter')
const ammendsRouter = require('./routers/ammendsRouter.js')
// ...


app.use('/', articlesRouter)

app.use('/ammends', ammendsRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// scheduling updates to the DB
execScheduler()

const {Article} = require('./db')

Article.addArticlesFromScratch()
.then(() => {
  console.log('articles added/updated in db')
  Article.pruneArticles()
})
.then(() => console.log("pruned articles"))
.catch(err => console.error('Error when calling setting up db in index.js', err))

