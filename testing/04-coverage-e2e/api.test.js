const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test ', (a) => {
    describe('/contact', (s) => {
        it('should request the contact page and return the HTTP status 200', async () => {
            const response = await request(app).get('/contact').expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')

        })
    })
    describe('/hi', () => {
        it('should request an existent route /hi and redirect to /hello', async () => {
            const response = await request(app).get('/hi').expect(200)
            assert.deepStrictEqual(response.text, 'hello world!')
        })
    })
    describe('/login', () => {
        it('should login successully on the login route and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({ userName: 'username', password: 'password' })
                .expect(200)
            assert.deepStrictEqual(response.text, 'login has succeeded!')
        })

        it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({ userName: 'testeuser', password: 'wrong pass' })
                .expect(401)
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Login failed')
        })
    })
    describe('/', () => {
        it('shoul request an existent route / and redirect to /hello ', async () => {
            const response = await request(app).get('/hi').expect(200)
            assert.deepStrictEqual(response.text, 'hello world!')
        })
    })
})