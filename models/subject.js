class Subject {
    #subjectId = 0;
    #name = '';
    #description = '';

    constructor(subjectId = 0) {
        this.#subjectId = subjectId;
    }

    set setLessonId(subjectId) {
        this.#subjectId = subjectId;
    }

    get getLessonId() {
        return this.#subjectId;
    }

    set setName(name) {
        this.#name = name;
    }

    get getName() {
        return this.#name;
    }

    set setDescription(description) {
        this.#description = description;
    }

    get getDescription() {
        return this.#description;
    }
}