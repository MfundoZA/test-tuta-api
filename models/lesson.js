class Lesson {
    #lessonId = 0;
    #title = "";
    #description = "";
    #videoUrl = "";
    #thumbnailUrl = "";
    #duration = 0; // In seconds
    #subjectId = 0;
    #gradeId = 0;
    #createdBy = "";
    #uploadedAt = "";
    #isPublished = false; // Changed to boolean
    #publishedAt = "";
    #viewCount = 0;

    constructor(lessonId = 0) {
        this.#lessonId = lessonId;
    }

    set setLessonId(lessonId) {
        this.#lessonId = lessonId;
    }

    get getLessonId() {
        return this.#lessonId;
    }

    set setTitle(title) {
        this.#title = title;
    }

    get getTitle() {
        return this.#title;
    }

    set setDescription(description) {
        this.#description = description;
    }

    get getDescription() {
        return this.#description;
    }

    set setVideoUrl(videoUrl) {
        this.#videoUrl = videoUrl;
    }

    get getVideoUrl() {
        return this.#videoUrl;
    }

    set setThumbnailUrl(thumbnailUrl) {
        this.#thumbnailUrl = thumbnailUrl;
    }

    get getThumbnailUrl() {
        return this.#thumbnailUrl;
    }

    set setDuration(duration) {
        this.#duration = duration;
    }

    get getDuration() {
        return this.#duration;
    }

    set setSubjectId(subjectId) {
        this.#subjectId = subjectId;
    }

    get getSubjectId() {
        return this.#subjectId;
    }

    set setGradeId(gradeId) {
        this.#gradeId = gradeId;
    }

    get getGradeId() {
        return this.#gradeId;
    }

    set setCreatedBy(createdBy) {
        this.#createdBy = createdBy;
    }

    get getCreatedBy() {
        return this.#createdBy;
    }

    set setUploadedAt(uploadedAt) {
        this.#uploadedAt = uploadedAt;
    }

    get getUploadedAt() {
        return this.#uploadedAt;
    }

    set setIsPublished(isPublished) {
        this.#isPublished = isPublished;
    }

    get getIsPublished() {
        return this.#isPublished;
    }

    set setPublishedAt(publishedAt) {
        this.#publishedAt = publishedAt;
    }

    get getPublishedAt() {
        return this.#publishedAt;
    }

    set setViewCount(viewCount) {
        this.#viewCount = viewCount;
    }

    get getViewCount() {
        return this.#viewCount;
    }
}