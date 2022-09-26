import mongoose from 'mongoose'

// shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: oneYearFromNow()
  },
}, {
  timestamps: true
})

function oneYearFromNow() {
  const today = new Date()
  console.log(today.getFullYear()+1, 'TODAY')
  today.setFullYear(today.getFullYear()+1)
  console.log(today)
  return today
}
oneYearFromNow()

// compile the schema into a model
const Flight = mongoose.model('Flight', flightSchema)

// export the model
export {
  Flight
}