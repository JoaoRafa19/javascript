const BaseRepository = require('./../repository/base/baseRepository')


class CarService {
    constructor ({cars})
    {
        this.carRepository = new BaseRepository({  file: cars})
    }

    chooseRandomCar(carCategory){
        console.log(carCategory)
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]
        return carId
    }

    getRandomPositionFromArray(list){
        const listLength = list.length;
        
        return Math.floor(Math.random() * (listLength))
    }

    async getAvailableCar(id) {
        return this.carRepository.find(id)
    }
}

module.exports = CarService