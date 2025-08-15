const Database = require('better-sqlite3');

// Initialize SQLite database
const db = new Database('./data/terms.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS terms (
        term_id INTEGER PRIMARY KEY AUTOINCREMENT,
        number INTEGER,
        grade_id INTERGER,
        subject_id INTGER
    )
`).run();


// Get all terms
const getTerms = (req, res) => {
    try {
        const termId = req.query.subject_id;

        if (termId === undefined || termId === 'null') {
            const terms = db.prepare('SELECT * FROM terms').all();
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(terms);
        } else {
            const terms = db.prepare('SELECT * FROM terms WHERE term_id = ?').all(termId);
            if (terms.length === 0) {
                return res.status(404).json({ message: 'No terms found' });
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(terms);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single grade by ID
const getTermById = (req, res) => {
    try {
        const grade = db.prepare('SELECT * FROM terms WHERE grade_id = ?').get(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: 'Term not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(grade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Todo: Get grade by title
const getTermsByTitle = (req, res) => {
    var title = req.params.title.replace(':', '');
    
    console.log(title);

    try {
        const terms = db.prepare('SELECT * FROM terms WHERE title = ?').get(title);
        if (!terms) {
            return res.status(404).json({ message: 'Terms not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(terms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new grade
const createTerm = (req, res) => {
    try {
        const {
            number,
            subjectId,
            gradeId,
        } = req.body;

        const result = db.prepare(`
            INSERT INTO terms (
                number, subject_id, grade_id
            ) VALUES (?, ?, ?)
        `).run(number, subjectId, gradeId);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Term created successfully',
            termId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a grade
const updateTerm = (req, res) => {
    try {
        const termId = req.params.id;
        const {
            number,
            subjectId,
            gradeId,
        } = req.body;

        const result = db.prepare(`
            UPDATE terms 
            SET number = ?, subject_id = ?, grade_id 

            WHERE term_id = ?
        `).run(number, subjectId, gradeId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Term not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Term updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a grade
const deleteTerm = (req, res) => {
    print(req.params.id + ': ' + typeof req.params.id);

    try {
        const result = db.prepare('DELETE FROM terms WHERE term_id = ?').run(req.params.id);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Term not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Term deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTerms,
    getTermById,
    getTermsByTitle,
    createTerm,
    updateTerm,
    deleteTerm
};
