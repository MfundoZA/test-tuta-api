const express = require('express');
const {
  getSubtopics,
  getSubtopicById,
  getSubtopicsById,
  getSubtopicsBySubjectGradeTerm,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic
} = require('../controllers/subtopicController');

const router = express.Router();

// GET /subtopics - Get all subtopics
router.get('/', getSubtopics);


// GET /subtopics/:id - Get a single subtopic
// router.get('/:id', getSubtopicById);

router.get('/:id', getSubtopicsById);

// GET /subtopics/title/:title - Get subtopics by title
//router.get('/title/:title', getSubtopicsBySubjectGradeTerm);

// POST /subtopics - Create new topic
router.post('/', createSubtopic);

// PUT /topics/:id - Update a topic
router.put('/:id', updateSubtopic);

// DELETE /topics/:id - Delete a topic
router.delete('/:id', deleteSubtopic);

module.exports = router;
