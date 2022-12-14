import mongoose from 'mongoose'

// shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  }
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    required: true,
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: oneYearFromNow()
  },
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]   // populate
}, {
  timestamps: true
})

function oneYearFromNow() {
  const today = new Date()
  // console.log(today.getFullYear()+1, 'TODAY')
  today.setFullYear(today.getFullYear()+1)
  // console.log(today)
  return today
}
oneYearFromNow()

// compile the schema into a model
const Flight = mongoose.model('Flight', flightSchema)

// export the model
export {
  Flight
}