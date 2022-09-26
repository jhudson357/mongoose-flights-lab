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
  const newFlight = new Flight()
  const dt = newFlight.departs
  // console.log(dt, 'DT')
  const departsDate = dt.toISOString().slice(0,16)
  // console.log(departsDate, 'DEPARTS DATE')
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate,
  })
}

function create(req, res) {
  // remove empty properties
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
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

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Info'
    })
  })
  .catch(error => {
    console.log(error, 'show error')
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  console.log('delete flight fxn')
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.rediret('/flights')
  })
  .catch(error => {
    console.log(error, 'delete error')
    res.redirect('/flights')
  })
}

function edit(req, res) { 
  Flight.findById(req.params.id)
  .then(flight => {
    const departsDate = flight.departs.toISOString().slice(0,16)
    console.log(departsDate, 'departsDate')
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight,
      departsDate,
    })
    console.log(flight.departs, 'FLIGHT DEPARTS INFO')
  })
  .catch(error => {
    console.log(error, 'edit error')
    res.redirect('/flights')
  })
}

function update(req, res) {
  // remove empty fields
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  } 
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error, 'update error')
    res.redirect('/flights')
  })
}


export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
}