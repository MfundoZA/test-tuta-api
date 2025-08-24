const express = require('express');
const {
  getLessons,
  getLessonById,
  getLessonsByTitle,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByTutor,
  getLessonsBySubject,
  getLessonsByTopic
} = require('../controllers/lessonController');

const router = express.Router();

// GET /lessons - Get all lessons
router.get('/', getLessons);


// GET /lessons/:id - Get a single lesson
router.get('/:id', getLessonById);

// GET /lessons/title/:title - Get lessons by title
router.get('/title/:title', getLessonsByTitle);

// GET /lessons/user/:id - Get lessons by user id
router.get('/user/:id', getLessonsByTutor);

// GET /lessons/subject/:subjectId/grade/:gradeId/term/:termId
router.get('/subject/:subjectId/grade/:gradeId/term/:termId', getLessonsBySubject);

// GET /lessons/topic/:topicId/subtopic/:subtopicId/
router.get('/topic/:topicId/subtopic/:subtopicId/', getLessonsByTopic);

// POST /lessons - Create new lesson
router.post('/', createLesson);

// PUT /lessons/:id - Update a lesson
router.put('/:id', updateLesson);

// DELETE /lessons/:id - Delete a lesson
router.delete('/:id', deleteLesson);

module.exports = router;
