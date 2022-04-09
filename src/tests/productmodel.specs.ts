import { product, productStore } from '../models/productmodel'

const lib = new productStore()

describe('product Model', () => {
    it('create method should add a new product', async () => {
        const result = await lib.create({
            id: 1,
            name:'test_product',
            price:'200',
            category:'test' 
        })
        delete result.id
        expect(result).toEqual({
            name:'test_product' ,
            price:'200',
            category:'test'
        })
    })

    it('should return a list of products', async () => {
        const result: Array<product> = await lib.index()
        expect(result[0].name).toEqual('test_product')
    })

    it('should return correct product', async () => {
        const result = await lib.show('1')
        expect(result.name).toEqual('test_product')
    })

    it('should remove product', async () => {
        lib.delete('test_product')
        const result = await lib.show('1')
        expect(result).toBeFalsy
    })
})
