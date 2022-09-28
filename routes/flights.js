import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()


// implicit /flights --> don't need to add /flights to routes

// GET /flights
router.get('/', flightsCtrl.index)

// GET /flights/new
router.get('/new', flightsCtrl.new)

// GET /flights/:id
router.get('/:id', flightsCtrl.show)

// GET /flights/:id/edit
router.get('/:id/edit', flightsCtrl.edit)

// POST /flights
router.post('/', flightsCtrl.create)

// POST /flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)

// POST /flights/:flightId/meals
router.post('/:id/meals', flightsCtrl.addMeal)

// DELETE /flights/:id
router.delete('/:id', flightsCtrl.delete)

// DELETE /flights/:id/tickets/:ticketId
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

// PUT /flights/:id
router.put('/:id', flightsCtrl.update)

export {
  router
}
