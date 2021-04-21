const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const execScheduler = require('./scheduler')
const articlesRouter = require('./routers/articlesRouter')
const ammendsRouter = require('./routers/ammendsRouter.js')
const Article = require('./models/articleModel')

const db_url = process.env.db_url
const port = process.env.PORT || 3000

mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true })
.then( () => console.log("Connected to DB"))
.catch(err => console.error(err))

app.use(express.json()); 
app.use(cors())

app.use('/', articlesRouter)
app.use('/ammends', ammendsRouter)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// scheduling DB stuff
execScheduler()
.then(() => console.log("cron job scheduled"))
.catch(err => (console.error("Issue in execScheduler call", err)))

Article.assignAmmends()
.then(() => console.log("Ammends assigned to articles"))
.catch(err => console.error('error in assign ammends call', err))

