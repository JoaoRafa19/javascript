
const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants')
const User = require('./user');
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: [
        "id", "name", "profession", "age",
    ]
}

class File {
    static async csvToJson(filepath){
        const content = await File.getFileContent(filepath);
        const validation = File.isValid(content);
        if(!validation.valid) throw new Error(validation.error);
        const users = File.parse(content);
        return users;
    }

    static parse(csvString){
        const lines = csvString.split('\n').map(line => line.replace(/\r/g, ''));
        const firstLine = lines.shift();
        const header = firstLine.split(',');

        const users = lines.map(line => {
            const column = line.split(',');
            
            let user = {};
            header.forEach((key, index) => {
                user[key] = column[index];
            });
            
            return new User(user);
        });
        return users;
    }

    static async getFileContent(filepath){
        return (await readFile(filepath)).toString("utf8");
    }

    static isValid(csvString, options=DEFAULT_OPTION){
        const [header, ...fileWithoutHeader ]= csvString.split('\n');
        const headerOptions = options.fields.join(',');
        const headerIsValid = header.trim() === headerOptions.trim();
        if (!headerIsValid) return { valid: false, error: error.HEADER_INVALID };
        
        const isContentLenghtvalid = (
            fileWithoutHeader.length > 0 &&
            fileWithoutHeader.length <= options.maxLines
            )
            if (!isContentLenghtvalid) return { valid: false, error: error.FILE_LENGHT_ERROR_MESSAGE };

        return {
            valid: true
        }
    }
}


module.exports = File;