class Grade {
    #gradeId = 0;
    #gradeName = "";
    #levelOrder = 10;

    constructor(gradeId = 0, gradeName = "", levelOrder = 10) {
        this.#gradeId = gradeId;
        this.#gradeName = gradeName;
        this.#levelOrder = levelOrder;
    }

    set setGradeId(gradeId) {
        this.#gradeId = gradeId;
    }

    get getGradeId() {
        return this.#gradeId;
    }

    set setLevelOrder(levelOrder) {
        this.#levelOrder = levelOrder;
    }
    
    get getLevelOrder() {
        return this.#levelOrder;
    }
    
    set setGradeName(gradeName) {
        this.#gradeName = gradeName;
    }

    get getGradeName() {
        return this.#gradeName;
    }

}