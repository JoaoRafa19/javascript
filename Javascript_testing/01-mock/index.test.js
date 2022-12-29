const File = require("./src/files");
const { rejects, deepStrictEqual } = require("assert");
const { error } = require("./src/constants");
(async () => {
    {
        const filepath = "./mocks/emptyfileinvalid.csv";
        const result =  File.csvToJson(filepath);
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
        await rejects(result, rejection);
    }
    {
        const filepath = "./mocks/fouritems.csv";
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
        const result = File.csvToJson(filepath);
        await rejects(result, rejection, "File length is not valid");
    }
    {
        const filepath = "./mocks/invalidheader.csv";
        const rejection = new Error(error.HEADER_INVALID);
        const result = File.csvToJson(filepath);
        await rejects(result, rejection, "Header is not valid");
    }
    {
        const filepath = "./mocks/threeitems.csv";
        const result = await File.csvToJson(filepath);

        const expectresult = [
            {
                id: 123,
                name: "João",
                profession: "Programer",
                birthYer: 2001
            },
            {
                id: 321,
                name: "Verônica",
                profession: "Designer",
                birthYer: 2000
            },
            {
                id: 111,
                name: "Miguel Lucas",
                profession: "Estudante",
                birthYer: 2011
            }
        ];
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expectresult));
    }
})();
