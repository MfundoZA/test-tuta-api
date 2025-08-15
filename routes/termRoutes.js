const express = require('express');
const {
  getTerms,
  getTermById,
  getTermsByTitle,
  createTerm,
  updateTerm,
  deleteTerm
} = require('../controllers/termController');

const router = express.Router();

// GET /terms - Get all terms
router.get('/', getTerms);


// GET /terms/:id - Get a single term
router.get('/:id', getTermById);

// GET /terms/title/:title - Get terms by title
router.get('/title/:title', getTermsByTitle);

// POST /terms - Create new term
router.post('/', createTerm);

// PUT /terms/:id - Update a term
router.put('/:id', updateTerm);

// DELETE /terms/:id - Delete a term
router.delete('/:id', deleteTerm);

module.exports = router;
