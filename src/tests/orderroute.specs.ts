import supertest from 'supertest'
import app from '../server'

describe('order route ', function () {
    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .get('/order/1')
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })
})
