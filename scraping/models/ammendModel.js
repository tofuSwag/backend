const mongoose = require('mongoose')
const ammendSchema = require('../schemas/ammendSchema')

const Ammend = mongoose.model('ammend', ammendSchema)

module.exports = Ammend