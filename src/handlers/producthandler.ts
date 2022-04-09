import express, { Request, Response } from 'express'
import { product, productStore } from '../models/productmodel'
import { authAdmin } from '../middlerwares/rolechecker'

const store = new productStore()

const listProducts = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {
        return error
    }
}

const showProduct = async (req: Request, res: Response) => {
    const productId: string = req.params.id as string
    try {
        const user = await store.show(productId)
        res.json(user)
    } catch (error) {
        return error
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const product: product = req.body
        const newProduct = await store.create(product)
        console.log(newProduct)
        res.json(newProduct)
    } catch (error) {
        return error
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.body.id
    try {
        const product: product = await store.show(productId)
        const deletedProduct: product = await store.delete(productId)
        console.log('deleted product is : ' + deletedProduct)
        res.json(product.name)
    } catch (error) {
        return error
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', listProducts)
    app.post('/add-product', authAdmin, addProduct)
    app.get('/product/:id', showProduct)
    app.post('/delete-product', authAdmin, deleteProduct)
}

export default product_routes
