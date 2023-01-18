 const {readFile, writeFile} = require('fs')
 
 class Database {
    
    constructor({table}){
        this.table = table
    }

    save(data) {
        return new Promise((resolve, reject) => {
            readFile(this.table, (err, content) => {
                if(err) return reject(err)
                const parsedContent = JSON.parse(content)
                parsedContent.push(data)
                writeFile(this.table, JSON.stringify(parsedContent), (err) => {
                    if(err) return reject(err)
                    resolve()
                })
            })
        })
    }

    list() {    
        return new Promise((resolve, reject) => {
            readFile(this.table, (err, content) => {
                if(err) return reject(err)
                const parsedContent = JSON.parse(content)
                resolve(parsedContent['data'])
            })
        })

    }

    remove(id) {
        return new Promise((resolve, reject) => {
            readFile(this.table, (err, content) => {
                if(err) return reject(err)
                let parsedContent = JSON.parse(content)
                parsedContent = parsedContent.filter(item => item.id !== id)
                writeFile(this.table, JSON.stringify(parsedContent), (err) => {
                    if(err) return reject(err)
                    resolve()
                })
            })
        })
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            readFile(this.table, (err, content) => {
                if(err) return reject(err)
                let parsedContent = JSON.parse(content)
                parsedContent = parsedContent.map(item => {
                    if(item.id === id) {
                        return {
                            ...item,
                            ...data
                        }
                    }
                    return item
                })
                writeFile(this.table, JSON.stringify(parsedContent), (err) => {
                    if(err) return reject(err)
                    resolve()
                })
            })
        })

    }

    
}

module.exports = Database