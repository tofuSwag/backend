const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const execScheduler = require('./scheduler')
const articlesRouter = require('./routers/articlesRouter')
const ammendsRouter = require('./routers/ammendsRouter.js')

const Article = require('./models/articleModel')
const Ammend = require('./models/ammendModel')

const db_url = process.env.db_url || "mongodb://localhost:27017"
const port = process.env.PORT || 3000
const sampleAmmends = require('../experiments/data.json')

mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true })
.then( () => console.log("Connected to DB"))
.catch(err => console.error(err))

const app = express()

app.use(express.json()); 
app.use(cors())

app.use('/', articlesRouter)
app.use('/ammends', ammendsRouter)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// scheduling DB stuff
execScheduler()
.then(() => console.log("cron job scheduled"))
.catch(err => (console.error("Issue in execScheduler call", err)))

// if the Ammends collection is populated, assign ammends to articles
async function prepopulateDatabase() {
    try {
        const numDocuments = await Ammend.countDocuments();
        if (numDocuments <= 0) {
            console.log("Writing sample ammends to DB since the collection is empty.")
            sampleAmmends.forEach(async (ammend) => await Ammend.addMasterAmmend(ammend))
        }
        await Article.assignAmmends()
    } catch (err) { 
        console.error("Error while prepopulatingDatabase & assigning ammends", err)
    }
}

prepopulateDatabase()
.then(() => console.log("Preopulated DB & assigned ammends"))
.catch(() => console.log("Error while prepopulating & assigning ammends"))

