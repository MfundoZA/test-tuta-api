const Database = require('better-sqlite3');

// Initialize SQLite database
const db = new Database('./data/subtopics.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS subtopics (
        subtopic_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        "order" INTEGER
        topic_id INTEGER
    )
`).run();


// Get all topics
const getSubtopics = (req, res) => {
    try {

        console.log('Is this method even being hit?!');
        
        if (/*topicId === undefined || topicId === 'null' */true) {
            console.log('Topics is null');
            const topics = db.prepare('SELECT * FROM subtopics').all();
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
const getSubtopicById = (req, res) => {
    try {
        const topic = db.prepare('SELECT * FROM subtopics WHERE subtopic_id = ?').get(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Subtopic not found' });
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
const getSubtopicsById = (req, res) => {
    var title = req.params.title.replace(':', '');

    console.log(title);

    try {
        const topics = db.prepare('SELECT * FROM subtopics WHERE topic_id = ?').get(title);
        if (!topics) {
            return res.status(404).json({ message: 'Subtopics not found' });
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
const createSubtopic = (req, res) => {
    try {
        const {
            title,
            order,
            topic_id
        } = req.body;

        console.log(req.body);

        const result = db.prepare(`
            INSERT INTO subtopics (
                title, "order", topic_id
            ) VALUES (?, ?, ?)
        `).run(title, order, topic_id);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Subtopic created successfully',
            topicId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a topic
const updateSubtopic = (req, res) => {
    try {
        const topicId = req.params.id;
        const {
            title,
            subjectId,
            gradeId,
            termId
        } = req.body;

        const result = db.prepare(`
            UPDATE subtopics 
            SET title = ?, subject_id = ?, grade_id = ?, term_id = ?
            WHERE topic_id = ?
        `).run(title, subjectId, gradeId, termId, topicId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Subtopic not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Subtopic updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a topic
const deleteSubtopic = (req, res) => {
    console.log(req.params.id + ': ' + typeof req.params.id);

    var id = req.params.id.replace(':', '');

    try {
        const result = db.prepare('DELETE FROM subtopics WHERE topic_id = ?').run(id);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Subtopic not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Subtopic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getSubtopics,
    getSubtopicById,
    getSubtopicsById,
    createSubtopic,
    updateSubtopic,
    deleteSubtopic
};
