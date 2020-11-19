const _ = require('lodash')
const mongoose = require('mongoose')
var geohash = require('ngeohash');

// const apikey = "009dc0c908d54a30859d80e6f8f3085f" // jesuisrahult walli
const apikey = "0744dcd782004b63a83a55a58ceb9f63" // this.is.rahul.tandon walli

const categories = [
    "Pollution",
    "Deforestation", 
    "Food Waste", 
    "Climate change", 
    "Global Warming", 
    "Biodiversity Loss", 
    "Water Scarcity"
]


const ammendSchema = new mongoose.Schema({
    name: String,
    homepageLink: String,
    baseUSDAmount: Number,
    type: String, // (Yourself, donate/volunteer, campaign)
    category: String, // (Food Waste, Biodiversity Loss, Pollution, Deforestation, Global Warming, Climate change, Food and Water Insecurity)
    description: String,
    scope: {
        type: String, 
        default: "local"
    }, // global, local. For local, geohash will be important
    geohash: String,
    status: {   // auto assign 
        type: String,
        default: "unverified" // verified/unverified
    }
});

ammendSchema.statics.addMasterAmmend = async function(userObj) {
    try {
        obj = _.pick(userObj, ['name', 'homepageLink', 'baseUSDAmount', 'type', 'category', 'description', 'scope', 'coordinates'])
    
        obj.geohash = geohash.encode(obj.coordinates.lat, obj.coordinates.long)
        
        obj.status = "verified" // because this is masterAdd

        await this.create(obj)
    }
    catch(err) {
        console.error('Error occured in addMasterAmmend method of ammendSchema', err)
    }
    
}

ammendSchema.statics.addProspectiveAmmend = async function(userObj) {
   try {
        obj = _pick(userObj, ['homepageLink', 'baseUSDAmount', 'type', 'category', 'description', 'scope', 'coordinates'])
        
        obj.geohash = geohash.encode(obj.lat, obj.long)
        
        // status will be UNVERIFIED by default

        await this.create(obj)
   }
   catch(err) {
        console.error('Error occured in addProspectiveAmmend method of ammendSchema', err)
   }
    
}

ammendSchema.statics.getAmmends = async function(userLocation, filterLevel=4) {
    
    try {
        console.log("filter level is" + filterLevel)

        // getting all the verified ammends
        let ammends = await this.find({status:"verified"}, {_id: 0, __v:0, status:0})
        
        // if location not given just return all
        if (!userLocation) {
            console.log("user location not given so giving all ammends")
            return ammends
        }

        /* IMPORTANT!
        Haven't done any verification of userLocation obj right now
        */
        let userHash = geohash.encode(userLocation.lat, userLocation.long)

        // need all global BUT closer local
        ammends = ammends.filter((am) => {
            if (am.scope === "global") {
                return am
            }

            // default value of filterLevel is 4
            // Findings by Experimentation: Will search for 4 char match
            // 4 chars of user'location and organistion location match then return
            if (userHash.substring(0,filterLevel) === am.geohash.substring(0, filterLevel)) {
            return am 
            }
        })
        
        // return ammends filtered by location
        if (ammends.length === 0 && filterLevel > 0)
        {
            return this.getAmmends(userLocation, filterLevel-1)
        }
        return ammends
    }
    catch(err) {
        console.error('Error occured in getAmmends method of ammendSchema', err)
   }
}


module.exports = ammendSchema

// trial object
let obj = {
    homepageLink: 'https://helloworld.com',
    baseUSDAmount: 5,
    type: 'Contribute', // (Yourself, donate/volunteer, campaign)
    category: 'Biodiversity Loss', // (Food Waste, Biodiversity Loss, Pollution, Deforestation, Global Warming, Climate change, Food and Water Insecurity)
    name: "Example name",
    description: "Rahul's home",
    scope: 'local',
    coordinates: {
        lat: 28.451590,  // ....N
        long: 77.521505 //....E
        // from geohash.org : ttp1u53qtbz9
    },
}
