const Database = require('better-sqlite3');

// Initialize SQLite database
const db = new Database('subjects.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS subjects (
        subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )
`).run();


// Get all subjects
const getSubjects = (req, res) => {
    try {
        const subjectId = req.query.subject_id;

        if (subjectId === undefined || subjectId === 'null') {
            const subjects = db.prepare('SELECT * FROM subjects').all();
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(subjects);
        } else {
            const subjects = db.prepare('SELECT * FROM subjects WHERE subject_id = ?').all(subjectId);
            if (subjects.length === 0) {
                return res.status(404).json({ message: 'No subjects found.' });
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(subjects);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

// Get a single subject by ID
const getSubjectById = (req, res) => {
    try {
        const subject = db.prepare('SELECT * FROM subjects WHERE subject_id = ?').get(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found.' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new subject
const createSubject = (req, res) => {
    try {
        const {
            title,
            name,
            description
        } = req.body;

        const result = db.prepare(`
            INSERT INTO subjects (
                title, name, description
            ) VALUES (?, ?, ?)
        `).run(title, name, description);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Subject created successfully',
            subjectId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a subject
const updateSubject = (req, res) => {
    try {
        const subjectId = req.params.id;
        const {
            title,
            name,
            description
        } = req.body;

        const result = db.prepare(`
            UPDATE subjects 
            SET title = ?, name = ?, description = ?
            WHERE subject_id = ?
        `).run(title, name, description, subjectId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Subject updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a subject
// How to make delete request

const deleteSubject = (req, res) => {
    try {
        const result = db.prepare('DELETE FROM subjects WHERE subject_id = ?').run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
};
