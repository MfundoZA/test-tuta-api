const Database = require('better-sqlite3');

// Initialize SQLite database
const db = new Database('./data/lessons.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS lessons (
        lesson_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT,
        duration INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        grade_id INTEGER NOT NULL,
        created_by INTEGER NOT NULL,
        uploaded_at TEXT DEFAULT (datetime('now')),
        is_published INTEGER DEFAULT 0,
        published_at TEXT,
        view_count INTEGER DEFAULT 0
    )
`).run();


// Get all lessons
const getLessons = (req, res) => {
    try {
        const subjectId = req.query.subject_id;

        if (subjectId === undefined || subjectId === 'null') {
            const lessons = db.prepare('SELECT * FROM lessons').all();
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(lessons);
        } else {
            const lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ?').all(subjectId);
            if (lessons.length === 0) {
                return res.status(404).json({ message: 'No lessons found for this subject' });
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            res.json(lessons);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single lesson by ID
const getLessonById = (req, res) => {
    try {
        const lesson = db.prepare('SELECT * FROM lessons WHERE lesson_id = ?').get(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Todo: Get lesson by title
const getLessonsByTitle = (req, res) => {
    try {
        const lessons = db.prepare('SELECT * FROM lessons WHERE title = ?').get(req.params.title);
        if (!lessons) {
            return res.status(404).json({ message: 'Lessons not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new lesson
const createLesson = (req, res) => {
    try {
        const {
            title,
            description,
            video_url,
            thumbnail_url,
            duration,
            subject_id,
            grade_id,
            created_by
        } = req.body;

        const result = db.prepare(`
            INSERT INTO lessons (
                title, description, video_url, thumbnail_url, 
                duration, subject_id, grade_id, created_by,
                uploaded_at, is_published, view_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 0, 0)
        `).run(title, description, video_url, thumbnail_url, duration, subject_id, grade_id, created_by);

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.status(201).json({
            message: 'Lesson created successfully',
            lessonId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a lesson
const updateLesson = (req, res) => {
    try {
        const lessonId = req.params.id;
        const {
            title,
            description,
            video_url,
            thumbnail_url,
            duration,
            subject_id,
            grade_id,
            is_published
        } = req.body;

        const result = db.prepare(`
            UPDATE lessons 
            SET title = ?, description = ?, video_url = ?, 
                thumbnail_url = ?, duration = ?, subject_id = ?,
                grade_id = ?, is_published = ?,
                published_at = CASE WHEN is_published = 1 AND published_at IS NULL 
                                  THEN datetime('now') 
                                  ELSE published_at 
                             END
            WHERE lesson_id = ?
        `).run(title, description, video_url, thumbnail_url, duration, subject_id, grade_id, is_published, lessonId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Lesson updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a lesson
const deleteLesson = (req, res) => {
    try {
        const result = db.prepare('DELETE FROM lessons WHERE lesson_id = ?').run(req.params.id);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getLessons,
    getLessonById,
    getLessonsByTitle,
    createLesson,
    updateLesson,
    deleteLesson
};
