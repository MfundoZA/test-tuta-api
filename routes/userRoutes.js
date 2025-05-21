const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// GET /users - Get all users
router.get('/', getUsers);

// GET /users/:id - Get a single user
router.get('/:id', getUserById);

// POST /users - Create new user
router.post('/', createUser);

// PUT /users/:id - Update a user
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user
router.delete('/:id', deleteUser);

module.exports = router;