// import the flight model
import { Flight } from "../models/flight.js"

function index(req, res) {
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

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    // console.log(req.body, 'REQ.BODY') // --> req.body an obj containing the singular seat and price that you just added
    flight.tickets.push(req.body)
    // console.log(flight.tickets)          // --> array of tickets objects
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error, 'update error')
      res.redirect('/flights')
    })
  })
  .catch(error => {
    console.log(error, 'update error')
    res.redirect('/flights')
  })
}

function deleteTicket(req, res) {
  // find the parent document (flight)
  Flight.findById(req.params.flightId)
  .then(flight => {
    // NOTE TO GRADER: LOGS LEFT TO HELP ME UNDERSTAND
    // console.log(flight, 'flight')  --> prints all flight info
    // console.log(flight.tickets, 'flight.tickets') --> prints all tickets
    // console.log({_id: req.params.ticketId}, '{_id: req.params.ticketId}') --> ticket id

    // remove child document (ticket)
    flight.tickets.remove({_id: req.params.ticketId})
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error, 'update error')
      res.redirect('/flights')
    })
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
  createTicket,
  deleteTicket,
}