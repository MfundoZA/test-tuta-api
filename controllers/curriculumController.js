// Get a single curriculum by ID
const getCurriculumBySubject = (req, res) => {
    var subjectName = req.params.subject;
    console.log(subjectName);
    var curriculum = getCurriculum(subjectName);

    try {
        if (!curriculum) {
            return res.status(404).json({ message: 'Curriculum not found' });
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

        res.json(curriculum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCurriculum = (name) => {
    if (name === "business") {
        return {
            "grades": [
                {
                    "grade": 10,
                    "terms": [
                        {
                            "term": 1,
                            "topics": [
                                "micro environment",
                                "market environment",
                                "macro environment",
                                "interrelationship between environments",
                                "Business sectors"
                            ]
                        },
                        {
                            "term": 2,
                            "topics": [
                                "Contemporary socioeconomic issues",
                                "Social responsibility",
                                "Entrepreneurship qualities",
                                "Forms of ownership"
                            ]
                        },
                        {
                            "term": 3,
                            "topics": [
                                "Creative thinking and problem solving",
                                "Business opportunity",
                                "Business location",
                                "Contracts",
                                "Presentation of Business information",
                                "Business Plan"
                            ]
                        },
                        {
                            "term": 4,
                            "topics": [
                                "Self-management",
                                "Relationship and team performance"
                            ]
                        }
                    ]
                },
                {
                    "grade": 11,
                    "terms": [
                        {
                            "term": 1,
                            "topics": [
                                "Influences on and control factors influencing business environments",
                                "Challenges in business environments",
                                "Adapting to challenges in business environments",
                                "Impact and challenges of contemporary socioeconomic issues on business operations",
                                "Business sectors",
                                "Benefits of a company versus other forms of ownership",
                                "Avenues of acquiring a business"
                            ]
                        },
                        {
                            "term": 2,
                            "topics": [
                                "Creative thinking and problem solving",
                                "Stress, crisis and change management",
                                "Transform a business plan into an action plan",
                                "Starting a business venture based on an action plan",
                                "Professionalism and ethics",
                                "Presentation of Business information"
                            ]
                        },
                        {
                            "term": 3,
                            "topics": [
                                "Assessment of entrepreneurial qualities in business",
                                "Citizenship roles and responsibilities",
                                "marketing activities, marketing in the formal and informal sectors",
                                "Use of technology for marketing",
                                "imports and exports",
                                "Foreign marketing",
                                "The alignment of foreign marketing and the production function",
                                "Production function"
                            ]
                        },
                        {
                            "term": 4,
                            "topics": [
                                "Team Stages, dynamics theories and conflict management",
                                "introduction to the human Resources function"
                            ]
                        }
                    ]
                },
                {
                    "grade": 12,
                    "terms": [
                        {
                            "term": 1,
                            "topics": [
                                "Impact of recent legislation on business - response to demands for redress and equity",
                                "Human Resources function",
                                "Professionalism and ethics",
                                "Creative thinking",
                                "Devise strategies to enable a business to respond to the challenges of the macro business environment"
                            ]
                        },
                        {
                            "term": 2,
                            "topics": [
                                "Corporate social responsibility",
                                "human Rights, inclusivity and environmental issues",
                                "Team performance assessment and Conflict management",
                                "Business sectors and their environments",
                                "management and leadership",
                                "Quality of performance within business functions"
                            ]
                        },
                        {
                            "term": 3,
                            "topics": [
                                "Investment: Securities",
                                "Investment: insurance",
                                "Forms of ownership and their impact on the business operation",
                                "Presentation of information and data response",
                                "Revision and preparation for mid-year examination"
                            ]
                        },
                        {
                            "term": 4,
                            "topics": [
                                "Revision and preparation for the final external examination"
                            ]
                        }
                    ]
                }
            ]
        }
    }

    return;
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
    updateCurriculum,
    deleteCurriculum
};
