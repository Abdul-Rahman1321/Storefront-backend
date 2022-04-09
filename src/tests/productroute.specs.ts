import supertest from 'supertest'
import app from '../server'

describe('products route ', function () {
    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .get('/products')
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })

    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .get('/product/1')
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })

    it('expect server to return 200 OK', (done) => {
        supertest(app)
            .post('/add-product')
            .send({
                id:2 ,
                name:'R_T_P' ,
                price: '200',
                category: 'test'
            })
            .expect(200)
            .end((err) => (err ? done.fail(err) : done()))
    })
})