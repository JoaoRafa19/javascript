const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')
const CarService = require('../../src/service/carService')



const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCostumer: require('../mocks/valid-costumer.json')
}
const carDatabase = join(__dirname, '../../database', 'cars.json')

describe('CarService Suite test', () => {
    let carService = {}
    let sandbox = {}

    before(() => {
        carService = new CarService({ cars: carDatabase })

    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Giver a carCategory it Should return an available car', async () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data);
        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it('should chose the first id from ids in carCategory', () => {
        const carCategory = mocks.validCarCategory
        const carIndex = 0
        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIndex)
        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
    });
})