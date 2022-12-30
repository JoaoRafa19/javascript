const Service = require("./src/service");
const sinon = require("sinon");
const fs = require('fs');
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

;(async () => {
    {
        const service = new Service();
        var withOutStup = await service.makeRequest(BASE_URL_1); 
        fs.writeFileSync('./mocks/tatooine.json', JSON.stringify(withOutStup));
        withOutStup = await service.makeRequest(BASE_URL_2);
        fs.writeFileSync('./mocks/alderaan.json', JSON.stringify(withOutStup));

    }
})();