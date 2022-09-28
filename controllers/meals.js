import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  console.log('NEW MEAL CONTROLLER')
  Meal.find({})     // find all meals
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals: meals
    })
  })
  .catch(error => {
    console.log('ERROR ERROR ERROR', error)
    res.redirect('/flights')
  })
}

function create(req, res) {
  console.log('CREATE MEAL')
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
  })
  .catch(error => {
    console.log('ERROR ERROR ERROR', error)
    res.redirect('/meals/new')
  })
}

export {
  newMeal as new,
  create,
}