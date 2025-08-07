// Get a single curriculum by ID
const getCurriculumBySubject = (req, res) => {
    const fs = require('fs');
    const subjectName = req.params.subject.replace(':', '');
    var curriculum;


    console.log('subjectName' + ': ' + subjectName);

    fs.readFile('./data/curriculum.json', 'utf8', (err, jsonResponse) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        try {
            curriculum = JSON.parse(jsonResponse);
        }
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
        
        try {
        if (!curriculum) {
            return res.status(404).json({ message: 'Curriculum not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

        // console.log(curriculum['curriculum'].find(x => x.subject === subjectName));
        res.json(curriculum['curriculum'].find(x => x.subject === subjectName));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
    });
};

const getCurriculumBySubjectAndGrade = (req, res) => {
    const subjectName = req.params.subject.replace(':', '');
    const gradeParam = parseInt(req.params.grade.replace(':', ''));

    const fs = require('fs');
    var curriculum;

    console.log('subjectName' + ': ' + subjectName);
    console.log('grade: ' + gradeParam + ': ' + typeof gradeParam);

    fs.readFile('./data/curriculum.json', 'utf8', (err, jsonResponse) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        // console.log('jsonResponse' + ': ' + jsonResponse);

        try {
            curriculum = JSON.parse(jsonResponse);
        }
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
        
        try {
        //console.log('curriculum empty?: ' + !curriculum);

        if (!curriculum) {
            return res.status(404).json({ message: 'No curriculum found.' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

        const subjectCurriculum = curriculum.curriculum.find(x => x.subject === subjectName);

        if (!subjectCurriculum) {
            return res.status(404).json({ message: 'Subject not found.' });
        }

        const gradeCurriculum = subjectCurriculum.grades.find(g => g.grade === gradeParam);
            
            if (!gradeCurriculum) {
                return res.status(404).json({ message: `Grade ${gradeParam} not found for ${subjectName}.` });
            }
        
        res.json(gradeCurriculum['terms']);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
    });

};

const getCurriculum = (name) => {

}


// Update a curriculum
const updateCurriculum = (req, res) => {
    try {
        const curriculumId = req.params.id;
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
            UPDATE curriculums 
            SET title = ?, description = ?, video_url = ?, 
                thumbnail_url = ?, duration = ?, subject_id = ?,
                grade_id = ?, is_published = ?,
                published_at = CASE WHEN is_published = 1 AND published_at IS NULL 
                                  THEN datetime('now') 
                                  ELSE published_at 
                             END
            WHERE curriculum_id = ?
        `).run(title, description, video_url, thumbnail_url, duration, subject_id, grade_id, is_published, curriculumId);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Curriculum not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Curriculum updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a curriculum
const deleteCurriculum = (req, res) => {
    try {
        const result = db.prepare('DELETE FROM curriculums WHERE curriculum_id = ?').run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Curriculum not found' });
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        res.json({ message: 'Curriculum deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCurriculumBySubject,
    getCurriculumBySubjectAndGrade,
    updateCurriculum,
    deleteCurriculum
};
