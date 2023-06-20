const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// GET: Get all exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST: Add a new exercise
router.route('/add').post((req, res) => {
    const user = req.body.user;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const sets = req.body.sets ? req.body.sets.map(set => ({ reps: set.reps, weight: set.weight })) : [];

    const newExercise = new Exercise({
        user,
        description,
        duration,
        date,
        sets
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});  

// GET: Get exercise by id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE: Delete exercise by id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST: Update exercise by id
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.user = req.body.user;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise.sets = req.body.sets ? req.body.sets.map(set => ({ reps: set.reps, weight: set.weight })) : [];

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;