const express = require('express');
const {
  getLessons,
  getLessonById,
  getLessonsByTitle,
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');

const router = express.Router();

// GET /lessons - Get all lessons
router.get('/', getLessons);


// GET /lessons/:id - Get a single lesson
router.get('/:id', getLessonById);

// GET /lessons/title/:title - Get lessons by title
router.get('/title/:title', getLessonsByTitle);

// POST /lessons - Create new lesson
router.post('/', createLesson);

// PUT /lessons/:id - Update a lesson
router.put('/:id', updateLesson);

// DELETE /lessons/:id - Delete a lesson
router.delete('/:id', deleteLesson);

module.exports = router;
