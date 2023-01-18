const Database = require("./src/core/database");

const { rejects, deepStrictEqual } = require("assert");
    ;(async () => {

    //     const service = new Service();
    // const stub = sinon.stub(service, service.makeRequest.name);
    // stub 
    //     .withArgs(BASE_URL+'1/')
    //     .resolves(mocks.tatooine)
    // stub
    //     .withArgs(BASE_URL+'2/')
    //     .resolves(mocks.alderaan)

    {
        const database = new Database('./data/data.json');
        const result = await database.list();
        console.log(result)
        const expected = [];
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
        
    }
    

    
    
})();
