import mongoose from 'mongoose'

// shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: String,
  flightNo: Number,
  departs: Date,
}, {
  timestamps: true
})

// compile the schema into a model
const Flight = mongoose.model('Flight', flightSchema)

// export the model
export {
  Flight
}