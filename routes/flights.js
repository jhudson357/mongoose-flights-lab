import { Router } from 'express'
const router = Router()

import * as flightsCtrl from '../controllers/flights.js'

// implicit /flights --> don't need to add /flights to routes

// GET /flights/new
router.get('/new', flightsCtrl.new)

export {
  router
}
