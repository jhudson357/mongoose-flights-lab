// import the flight model
import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  console.log('this is the new controller working!')
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  console.log('INDEX IS WORKING')
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights',
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}

export {
  newFlight as new,
  create,
  index,
}