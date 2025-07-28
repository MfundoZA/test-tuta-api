const express = require('express');
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');

const router = express.Router();

// GET /subjects - Get all subjects
router.get('/', getSubjects)


// GET /subjects/:id - Get a single subject
router.get('/:id', getSubjectById)

// POST /subjects - Create new subject
router.post('/', createSubject);

// PUT /subjects/:id - Update a subject
router.put('/:id', updateSubject);

// DELETE /subjects/:id - Delete a subject
router.delete('/:id', deleteSubject);

module.exports = router;
