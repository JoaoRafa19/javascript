const Base = require('./base/base');


class Costumer extends Base {

    contructor({id, name, age}){
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
}

module.exports = Costumer;