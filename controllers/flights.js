// import the flight model
import { Flight } from "../models/flight.js"

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
    console.log(error, 'index error')
    res.redirect('/flights/index')
  })
}

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
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error, 'create error')
    res.redirect('/flights/new')
  })
}

export {
  newFlight as new,
  create,
  index,
}