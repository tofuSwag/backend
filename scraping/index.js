const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const execScheduler = require('./scheduler')
const articlesRouter = require('./routers/articlesRouter')
const ammendsRouter = require('./routers/ammendsRouter.js')


app.use(express.json()); 
app.use(cors())


app.use('/', articlesRouter)

app.use('/ammends', ammendsRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// scheduling DB stuff
execScheduler()
.then(() => console.log("cron job scheduled"))
.catch(err => (console.error("Issue in execScheduler call", err)))
