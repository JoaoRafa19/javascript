const Database  = require('../../core/database')
const Project = require('../../entity/project')

class Projects extends Database {

    constructor() {
        super({table: './data/data.json'})
    }

    async save(data) {
        const project = new Project(data)
        return await super.save(project)
    }


    async list() {
        const projectsData = await super.list()
        console.log(projectsData)
        if(projectsData.lenght === 0) return new Error('No data found');
        return projectsData.map(item => new Project(item))
    }

   
    
}

module.exports = Projects