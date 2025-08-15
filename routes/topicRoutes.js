const express = require('express');
const {
  getTopics,
  getTopicById,
  getTopicsByTitle,
  createTopic,
  updateTopic,
  deleteTopic
} = require('../controllers/topicController');

const router = express.Router();

// GET /topics - Get all topics
router.get('/', getTopics);


// GET /topics/:id - Get a single topic
router.get('/:id', getTopicById);

// GET /topics/title/:title - Get topics by title
router.get('/title/:title', getTopicsByTitle);

// POST /topics - Create new topic
router.post('/', createTopic);

// PUT /topics/:id - Update a topic
router.put('/:id', updateTopic);

// DELETE /topics/:id - Delete a topic
router.delete('/:id', deleteTopic);

module.exports = router;
