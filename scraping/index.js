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

Article.pruneArticles()
.then("pruned articles")
.catch(err => console.error("error while pruning articles where author property had value null", err))
