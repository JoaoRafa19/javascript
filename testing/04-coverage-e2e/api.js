const http = require('http')

const routes = {

    '/contact:get' : (request, response) => {
        response.write('contact us page');
        return response.end();
    } ,


    default: (request, response) => {
        response.write('hello world!');
        return response.end();
    }

}

const handler = function (request, response) {
    const {url, method} = request
    const routeLog = `${method} - ${url}`
    const routeKey = `${url}:${method}`.toLowerCase()
    console.log(routeKey)

    const chosen = routes[routeKey] || routes.default
    response.writeHeader(200, {
        'Content-Type': 'text/html',

    })

    return chosen(request, response)
}

const app = http.createServer(handler). listen(3000, ()=>console.log('app runing at', 3000))

module.exports = app