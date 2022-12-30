const http = require('http')

const DEFAULT_USER = { userName: 'username', password: 'password' }

const routes = {

    '/contact:get': (request, response) => {
        response.write('contact us page');
        return response.end();
    },

    '/login:post': async (request, response) => {
        // response é um iterador assincrono
        for await (const data of request) {
            const user = JSON.parse(data);
            if (user.userName !== DEFAULT_USER.userName || user.password !== DEFAULT_USER.password) {
                response.writeHead(401)
                response.write("Login failed")
                return response.end()
            }
            
            console.log(user)
            response.write('login has succeeded!');
            return response.end();
            

        }
    },


    default: (request, response) => {
        response.write('hello world!');
        return response.end();
    }

}

const handler = function (request, response) {
    const { url, method } = request
    const routeLog = `${method} - ${url}`
    const routeKey = `${url}:${method}`.toLowerCase()
    console.log(routeKey)

    const chosen = routes[routeKey] || routes.default
    response.writeHeader(200, {
        'Content-Type': 'text/html',

    })

    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('app runing at', 3000))

module.exports = app