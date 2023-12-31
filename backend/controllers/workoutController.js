const Workout = require('../models/workoutModel')
const moongose = require('mongoose')

// get all workouts

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    
    if(!moongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

     if(!workout) {
        return res.status(404).json({error: 'No such workout found!'})
     }

     res.status(200).json(workout)
}
// create new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
     
    // add doc to DB
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!moongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout) {
        return res.status(404).json({error: 'No such workout found!'})
    }

    res.status(200).json(workout)

}

// update workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!moongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: 'No such workout found!'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}