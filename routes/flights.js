import { Router } from 'express'
const router = Router()

import * as flightsCtrl from '../controllers/flights.js'

// implicit /flights --> don't need to add /flights to routes

// GET /flights
router.get('/', flightsCtrl.index)

// GET /flights/new
router.get('/new', flightsCtrl.new)

// GET /flights/:id
router.get('/:id', flightsCtrl.show)

// POST /flights
router.post('/', flightsCtrl.create)

export {
  router
}