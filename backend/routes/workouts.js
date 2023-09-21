const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout
} = require('../controllers/workoutController')

const router = express.Router()

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete a workout'})
})

router.patch('/:id', (req, res) => {
    res.json({msg: 'Update a workout'})
})

module.exports = router