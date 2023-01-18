const faker = require('faker');
const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const costumer = require('../src/entities/costumer')
const { writeFile, } = require('fs/promises')
const { join } = require("path");
const Costumer = require('../src/entities/costumer');



const seederBaseFolder = join(__dirname, "../", "database")


const ITEMS_AMOUNT = 2;

const cars = []
const customers=  []
const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    price: parseFloat(faker.finance.amount(20, 100)),
    carIds: []
}
)


for (let index = 0; index < ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear(),
    })

    carCategory.carIds.push(car.id);
    cars.push(car);

    const customer = new Costumer({
            id: faker.random.uuid, 
            age: faker.random.number({min:18, max:50}),
            name: faker.name.findName(),
            
    })

    customers.push(customer)

}

const write = (filename, data) => {
    try {
        writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

    } catch (err) {
        writeFile(join(seederBaseFolder, filename), JSON.stringify(JSON.parse(data), null, '\t'));
    }
}


    ; (async () => {

        await write('cars.json', cars)
        await write('customers.json', customers)
        await write('carsCategory.json', [carCategory])

    })()