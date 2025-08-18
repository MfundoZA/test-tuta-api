const Database = require('better-sqlite3');
// import path
const path = require('path');

const dbPath = path.join(process.cwd(), '/data', 'users.db');

// Initialize SQLite database
const db = new Database(dbPath);

// Create users table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    firstName TEXT,
    lastName TEXT,
    userType TEXT,
    profilePictureUrl TEXT,
    bio TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    lastActive TEXT DEFAULT (datetime('now'))
  )
`).run();

// Get all users
const getUsers = async (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE userId = ?');
    const user = stmt.get(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Todo: Get Tutors

// Todo: GetTutorsBySubject

// Create user
const createUser = async (req, res) => {
  try {
    const { email, passwordHash, firstName, lastName, userType, profilePictureUrl, bio } = req.body;

    const stmt = db.prepare(`
      INSERT INTO users 
      (email, passwordHash, firstName, lastName, userType, profilePictureUrl, bio) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(email, passwordHash, firstName, lastName, userType, profilePictureUrl, bio);
    const newUser = db.prepare('SELECT * FROM users WHERE userId = ?').get(info.lastInsertRowid);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { email, firstName, lastName, userType, profilePictureUrl, bio } = req.body;

    const stmt = db.prepare(`
      UPDATE users SET 
      email = ?, 
      firstName = ?, 
      lastName = ?, 
      userType = ?,
      profilePictureUrl = ?,
      bio = ?,
      lastActive = datetime('now')
      WHERE userId = ?
    `);

    const changes = stmt.run(
      email,
      firstName,
      lastName,
      userType,
      profilePictureUrl,
      bio,
      req.params.id
    );

    if (changes.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = db.prepare('SELECT * FROM users WHERE userId = ?').get(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM users WHERE userId = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Make sure to export all the functions
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};