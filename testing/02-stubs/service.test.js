const Service = require("./src/service");
const sinon = require("sinon");
const {join} = require("path")
const { deepStrictEqual } = require("assert");
const BASE_URL = "https://swapi.dev/api/planets/";

const mocks = {
    alderaan: require(join(__dirname, "./mocks/alderaan.json")),
    tatooine: require(join(__dirname, './mocks/tatooine.json')),
}

;(async () => {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    stub 
        .withArgs(BASE_URL+'1/')
        .resolves(mocks.tatooine)
    stub
        .withArgs(BASE_URL+'2/')
        .resolves(mocks.alderaan)
    
    {
        const response = await service.makeRequest(BASE_URL+'1/');
        
        const expect = {
            name: "Tatooine",
            surfaceWater: "1",
            appeaedIn: 1
        }
    }
    {
        const expect = {
            name: "Alderaan",
            surfaceWater: "40",
            appeaedIn: 2
        }

        const resp = await service.getPlanets(BASE_URL+'2/');

        deepStrictEqual(resp, expect);

        
    }
    {
        const expect = {
            name: "Tatooine",
            surfaceWater: "1",
            appeaedIn: 5
        }
        const resp = await service.getPlanets(BASE_URL+'1/');

        deepStrictEqual(resp, expect);


    }
})();
