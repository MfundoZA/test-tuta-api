const Database = require('better-sqlite3');

// Initialize SQLite database
const db = new Database('./data/topics.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS topics (
        topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subject_id INTEGER,
        year_level INTEGER,
        period INTEGER
    )
`).run();


// Get all topics
const getTopics = (req, res) => {
    try {
        const topicId = req.query.subject_id;

        if (topicId === undefined || topicId === 'null') {
            const topics = db.prepare('SELECT * FROM topics').all();
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(topics);
        } else {
            const topics = db.prepare('SELECT * FROM topics WHERE subject_id = ?').all(topicId);
            if (topics.length === 0) {
                return res.status(404).json({ message: 'No topics found for this subject' });
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(topics);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single topic by ID
const getTopicById = (req, res) => {
    try {
        const topic = db.prepare('SELECT * FROM topics WHERE topic_id = ?').get(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Todo: Get topic by title
const getTopicsByTitle = (req, res) => {
    var title = req.params.title.replace(':', '');
    
    console.log(title);

    try {
        const topics = db.prepare('SELECT * FROM topics WHERE title = ?').get(title);
        if (!topics) {
            return res.status(404).json({ message: 'Topics not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopicsBySubjectAndGrade = (req, res) => {
    var subject = parseInt(req.params.subject.replace(':', ''));
    var grade = parseInt(req.params.grade.replace(':', ''));


    try {
        const topics = db.prepare('SELECT * FROM topics WHERE subject_id = ? AND year_level = ?').all(subject, grade);

        if (!topics) {
            return res.status(404).json({ message: 'Topics not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Todo: Get topic by title
const getTopicsBySubjectGradeTerm = (req, res) => {
    var subject = parseInt(req.params.subject.replace(':', ''));
    var grade = parseInt(req.params.grade.replace(':', ''));
    var term = parseInt(req.params.term.replace(':', ''));

    try {
        const topics = db.prepare('SELECT * FROM topics WHERE subject_id = ?, year_level = ?, period = ?').get(subject, grade, term);
        if (!topics) {
            return res.status(404).json({ message: 'Topics not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new topic
const createTopic = (req, res) => {
    try {
        const {
            title,
            subjectId,
            yearLevel,
            period
        } = req.body;

        const result = db.prepare(`
            INSERT INTO topics (
                title, subject_id, year_level, period
            ) VALUES (?, ?, ?, ?)
        `).run(title, subjectId, yearLevel, period);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Topic created successfully',
            topicId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a topic
const updateTopic = (req, res) => {
    try {
        const topicId = req.params.id;
        const {
            title,
            subjectId,
            yearLevel,
            period
        } = req.body;

        const result = db.prepare(`
            UPDATE topics 
            SET title = ?, subject_id = ?, year_level = ?, period = ?
            WHERE topic_id = ?
        `).run(title, subjectId, yearLevel, period, topicId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Topic updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a topic
const deleteTopic = (req, res) => {
    console.log(req.params.id + ': ' + typeof req.params.id);

    var id = req.params.id.replace(':', '');

    try {
        const result = db.prepare('DELETE FROM topics WHERE topic_id = ?').run(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTopics,
    getTopicById,
    getTopicsByTitle,
    getTopicsBySubjectAndGrade,
    createTopic,
    updateTopic,
    deleteTopic
};
