const express = require('express');
const {
  getGrades,
  getGradeById,
  getGradeBySubjectIdAndLevel,
  createGrade,
  updateGrade,
  deleteGrade
} = require('../controllers/gradeController');

const router = express.Router();

// GET /grades - Get all grades
router.get('/', getGrades);


// GET /grades/:id - Get a single grade
router.get('/:id', getGradeById);

// GET /grades/title/:title - Get grades by title
router.get('/:subject/:level/', getGradeBySubjectIdAndLevel);

// POST /grades - Create new grade
router.post('/', createGrade);

// PUT /grades/:id - Update a grade
router.put('/:id', updateGrade);

// DELETE /grades/:id - Delete a grade
router.delete('/:id', deleteGrade);

module.exports = router;
