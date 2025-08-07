const express = require('express');
const {
  //getCurriculums,
  getCurriculumBySubject,
  getCurriculumBySubjectAndGrade
  //createCurriculum,
  //updateCurriculum,
  //deleteCurriculum
} = require('../controllers/curriculumController');

const router = express.Router();

// GET /curriculums - Get all curriculums
// router.get('/', getCurriculums)


// GET /curriculums/:id - Get a single curriculum
router.get('/:subject', getCurriculumBySubject);

router.get('/:subject/:grade', getCurriculumBySubjectAndGrade);

// POST /curriculums - Create new curriculum
// router.post('/', createCurriculum);

// PUT /curriculums/:id - Update a curriculum
//  router.put('/:id', updateCurriculum);

// DELETE /curriculums/:id - Delete a curriculum
// router.delete('/:id', deleteCurriculum);

module.exports = router;
