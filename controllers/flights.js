// import the flight model
import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  console.log('this is the new controller working!')
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

export {
  newFlight as new,
}