import supertest from 'supertest'
import app from '../server'

describe('users route ', function () {
    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .get('/users')
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })

    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .get('/user/1')
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })

    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .post('/register')
            .send({
                id: 2,
                username: 'test',
                first_name: 'first',
                last_name: 'last',
                password: 'test',
                role: 'admin',
            })
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })
})
