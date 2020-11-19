const express = require('express')
const router = express.Router()
const {Ammend} = require('../db')


router.get('/getAmmends', async (req, res) => {
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

        
        
        // Think about doing this / not doing this
        // if (ammends.length === 0) {
        //     ammends = await Ammend.getAmmends(req.body, 3)
        // }
        
        // if (req.body.lat && req.body.long) ammends.push("received the extra argument")
        // else ammends.push("not extra argument received")
        
        // res.send(ammends)
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

        // NEEDS TO BE FIXED RIGHT NOW!
        // if req.body
        await Ammend.addProspectiveAmmend()
        let sendText
        res.send("ammend added to db")
    }
    catch(err) {
        console.error(err)
        res.status(500)
        res.send('An error occured in the PUBLIC /makeAmmend endpoint handler')
    }
})



module.exports = router