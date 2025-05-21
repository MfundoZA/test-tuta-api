class User {
    #userId = 0;
    #email = "";
    #passwordHash = "";
    #firstName = "";
    #lastName = "";
    #userType = '';
    #profilePictureUrl = "";
    #bio = "";
    #createdAt = "";
    #lastActive = "";

    constructor(userId = 0) {
        this.#userId = userId;
    }

    set setUserId(userId) {
        this.#userId = userId;
    }

    get getUserId() {
        return this.#userId;
    }

    set setEmail(email) {
        this.#email = email;
    }

    get getEmail() {
        return this.#email;
    }

    set setPasswordHash(passwordHash) {
        this.#passwordHash = passwordHash;
    }

    get getPasswordHash() {
        return this.#passwordHash;
    }

    set setFirstName(firstName) {
        this.#firstName = firstName;
    }

    get getFirstName() {
        return this.#firstName;
    }

    set setLastName(lastName) {
        this.#lastName = lastName;
    }

    get getLastName() {
        return this.#lastName;
    }

    set setUserType(userType) {
        this.#userType = userType;
    }

    get getUserType() {
        return this.#userType;
    }

    set setProfilePictureUrl(profilePictureUrl) {
        this.#profilePictureUrl = profilePictureUrl;
    }

    get getProfilePictureUrl() {
        return this.#profilePictureUrl;
    }

    set setBio(bio) {
        this.#bio = bio;
    }

    get getBio() {
        return this.#bio;
    }

    set setCreatedAt(createdAt) {
        this.#createdAt = createdAt;
    }

    get getCreatedAt() {
        return this.#createdAt;
    }

    set setLastActive(lastActive) {
        this.#lastActive = lastActive;
    }

    get getLastActive() {
        return this.#lastActive;
    }
}