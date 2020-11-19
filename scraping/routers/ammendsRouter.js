const express = require('express')
const router = express.Router()
const {Ammend} = require('../db')


router.get('/getAmmends/', async (req, res) => {
    try {
        let userLocation = req.body
        if (userLocation.lat && userLocation.long) {
            let ammends =  await Ammend.getAmmends(userLocation)
            res.send(ammends)
        }
        else {
            let ammends = await Ammend.getAmmends()
            res.send(ammends)
        }

    }
    catch(err) {
        console.error(err)
        res.status(500)
        res.send('An error occured in the /getAmmends endpoint handler')
    }
})

// this is bad design but letting it be for now
router.post('/makeAmmend/tofuSwagHiddenEndpoint', async (req, res) => {
    try {
        let userObj = req.body
        
        if (!userObj) res.status(400).send("Need to send ammend details in body of post request")
        
        await Ammend.addMasterAmmend(userObj)
        res.send("Ammend added to DB.")
        
    }
   
    catch(err){
        console.error(err)
        res.status(500)
        res.send('An error occured in the /makeAmmend/tofuSwag endpoint handler')
    }
})


router.post('/makeAmmend', async (req, res) => {
    try {

        let userObj = req.body
        
        if (!userObj) res.status(400).send("Need to send ammend details in body of post request")
        
        await Ammend.addProspectiveAmmend(userObj)
        res.status(201).send("Ammend added to DB.")
    }
    catch(err) {
        console.error(err)
        res.status(500)
        res.send('An error occured in the PUBLIC /makeAmmend endpoint handler')
    }
})



module.exports = router