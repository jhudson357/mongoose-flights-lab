import { Router } from 'express'

const router = Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'this is title - in index.js under routes - UPDATE' })
})

export { 
  router
}
