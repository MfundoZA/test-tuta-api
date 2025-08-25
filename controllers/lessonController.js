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
        term_id INTEGER NOT NULL,
        topic_id INTEGER NOT NULL,
        subtopic_id INTEGER NOT NULL,
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
    var title = req.params.title.replace(':', '');
    
    console.log(title);

    try {
        const lessons = db.prepare('SELECT * FROM lessons WHERE title = ?').get(title);
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

// Get lessons by tutor
const getLessonsByTutor = (req, res) => {
    try {
        const lessons = db.prepare('SELECT * FROM lessons WHERE created_by = ?').all(req.params.tutorId);
        if (lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this tutor' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get lessons by subject
const getLessonsBySubject = (req, res) => {
    if (req.params.gradeId != 'null') {
        whereStmt = ' AND grade_id = ?';
    }

    if (req.params.termId != 'null') {
        whereStmt += ' AND term_id = ?';
    }

    try {
        var lessons;

        if (req.params.gradeId === 'null' && req.params.termId === 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ?').all(req.params.subjectId);
        }
        else if (req.params.gradeId != 'null' && req.params.termId === 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ?').all(req.params.subjectId, req.params.gradeId);
        }
        else if (req.params.gradeId === 'null' && req.params.termId != 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND term_id = ?').all(req.params.subjectId, req.params.termId);
        }
        else {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ? AND term_id = ?').all(req.params.subjectId, req.params.gradeId, req.params.termId);
        }

        if (lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this subject' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get lessons by topic
const getLessonsByTopic = (req, res) => {
    if (req.params.topicId != 'null') {
        whereStmt = ' AND topic_id = ?';
    }

    if (req.params.subtopicId != 'null') {
        whereStmt += ' AND subtopic_id = ?';
    }

    try {
        var lessons;

        if (req.params.topicId === 'null' && req.params.subtopicId === 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ? AND term_id = ?').all(req.params.subjectId, req.params.gradeId, req.params.termId);
        }
        else if (req.params.topicId != 'null' && req.params.subtopicId === 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ? AND term_id = ? AND topic_id = ?').all(req.params.subjectId, req.params.gradeId, req.params.termId, req.params.topicId);
        }
        else if (req.params.topicId === 'null' && req.params.subtopicId != 'null') {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ? AND term_id = ? AND subtopic_id = ?').all(req.params.subjectId, req.params.gradeId, req.params.termId, req.params.subtopicId);
        }
        else {
            lessons = db.prepare('SELECT * FROM lessons WHERE subject_id = ? AND grade_id = ? AND term_id = ? AND topic_id = ? AND subtopic_id = ?').all(req.params.subjectId, req.params.gradeId, req.params.termId, req.params.topicId, req.params.subtopicId);
        }

        if (lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this topic' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new lesson
const createLesson = (req, res) => {
    try {
        const {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            duration,
            subjectId,
            gradeId,
            termId,
            topicId,
            subtopicId,
            createdBy
        } = req.body;

        const result = db.prepare(`
            INSERT INTO lessons (
                title, description, video_url, thumbnail_url, 
                duration, subject_id, grade_id, term_id, topic_id, subtopic_id, created_by,
                uploaded_at, is_published, published_at, view_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 0, null, 0)
        `).run(title, description, videoUrl, thumbnailUrl, duration, subjectId, gradeId, termId, topicId, subtopicId, createdBy);

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
            videoUrl,
            thumbnailUrl,
            duration,
            subjectId,
            gradeId,
            termId,
            topicId,
            subtopicId,
            createdBy,
            uploadedAt,
            isPublished,
            publishedAt,
            viewCount
        } = req.body;

        const result = db.prepare(`
            UPDATE lessons 
            SET title = ?, description = ?, video_url = ?, 
                thumbnail_url = ?, duration = ?, subject_id = ?,
                grade_id = ?, term_id = ?, topic_id = ?, subtopic_id = ?, is_published = ?,
                published_at = CASE WHEN is_published = 1 AND published_at IS NULL 
                                  THEN datetime('now') 
                                  ELSE published_at 
                             END
                created_by = ?, uploaded_at = ?, view_count = ?
            WHERE lesson_id = ?
        `).run(title, description, videoUrl, thumbnailUrl, duration, subjectId, gradeId, isPublished, lessonId, termId, topicId, subtopicId, isPublished, publishedAt, createdBy, uploadedAt, viewCount);

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
    print(req.params.id + ': ' + typeof req.params.id);

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
    getLessonsByTutor,
    getLessonsBySubject,
    getLessonsByTopic,
    createLesson,
    updateLesson,
    deleteLesson
};
