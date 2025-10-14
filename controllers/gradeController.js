const path = require('path');
const Database = require('better-sqlite3');

const controllerDir = __dirname; 

const dbPath = path.join(controllerDir, '..', 'data', 'grades.db'); 

console.log('Database path:', dbPath);

// Initialize SQLite database
const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS grades (
        grade_id INTEGER PRIMARY KEY AUTOINCREMENT,
        level int NOT NULL,
        subject_id TEXT
    )
`).run();


// Get all grades
const getGrades = (req, res) => {
    try {
        const gradeId = req.query.grade_id;

        if (gradeId === undefined || gradeId === 'null') {
            const grades = db.prepare('SELECT * FROM grades').all();
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(grades);
        } else {
            const grades = db.prepare('SELECT * FROM grades WHERE grade_id = ?').all(gradeId);
            if (grades.length === 0) {
                return res.status(404).json({ message: 'No grades found.' });
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(grades);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

// Get a single grade by ID
const getGradeById = (req, res) => {
    try {
        const grade = db.prepare('SELECT * FROM grades WHERE grade_id = ?').get(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found.' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a grade by subject id and level
const getGradeBySubjectIdAndLevel = (req, res) => {
    try {
        const grade = db.prepare('SELECT * FROM grades WHERE level = ? AND subject_id = ?').get(req.params.level, req.params.id);
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found.' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new grade
const createGrade = (req, res) => {
    try {
        const {
            level,
            subjectId
        } = req.body;

        const result = db.prepare(`
            INSERT INTO grades (
                level, subject_id
            ) VALUES ( ?, ?)
        `).run(level, subjectId);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Grade created successfully',
            gradeId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a grade
const updateGrade = (req, res) => {
    try {
        const gradeId = req.params.id;
        const {
            name,
            description
        } = req.body;

        const result = db.prepare(`
            UPDATE grades 
            SET name = ?, description = ?
            WHERE grade_id = ?
        `).run(name, description, gradeId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Grade updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a grade
// How to make delete request

const deleteGrade = (req, res) => {
    try {
        const result = db.prepare('DELETE FROM grades WHERE grade_id = ?').run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Grade deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getGrades,
    getGradeById,
    getGradeBySubjectIdAndLevel,
    createGrade,
    updateGrade,
    deleteGrade
};
