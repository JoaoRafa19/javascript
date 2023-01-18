class Project {


    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.owner = data.owner
        this.concluded = data.concluded
        this.ownerId = data.ownerId
        this.description = data.description
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }

}

module.exports = Project