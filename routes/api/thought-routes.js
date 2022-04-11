const router = require('express').Router();
const { getAllThought, getThoughtById, addThought, deleteThought, addReaction, removeReaction, updateThought } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought


// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


router
    .route('/:thoughtId/reaction')
    .post(addReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

router
    .route('/')
    .get(getAllThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;