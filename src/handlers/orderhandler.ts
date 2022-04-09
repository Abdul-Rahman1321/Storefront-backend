import express, { Request, Response } from 'express'
import { order, orderStore } from '../models/ordermodel'
import { authUser } from '../middlerwares/authmiddle'
import { authAdmin } from '../middlerwares/rolechecker'

const store = new orderStore()

const listOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (error) {
        console.log('err: ' + error)
    }
}

const showOrder = async (req: Request, res: Response) => {
    const orderId: string = req.params.id as string
    try {
        const order = await store.show(orderId)
        res.json(order)
    } catch (error) {
        console.log('cannot show order with id ' + orderId)
    }
}

const showUserOrder = async (req: Request, res: Response) => {
    const userId: string = req.params.user_id as string
    try {
        const order = await store.show(userId)
        res.json(order)
    } catch (error) {
        console.log('cannot show order with user_id ' + userId)
    }
}

const addOrder = async (req: Request, res: Response) => {
    try {
        const order: order = req.body
        const newOrder = await store.create(order)
        console.log(newOrder)
        res.json(newOrder)
    } catch (error) {
        console.log('coudnot add new order : ' + error)
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    const orderId = req.body.id
    try {
        const order: order = await store.show(orderId)
        const deletedOrder: order = await store.delete(orderId)
        console.log('deleted order is : ' + deletedOrder)
        res.json(order.id)
    } catch (error) {
        console.log(`couldn't delete order with id ${orderId} err: ${error}`)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', authAdmin, listOrders)
    app.post('/add-order', authUser, addOrder)
    app.get('/order/:id', authAdmin, showOrder)
    app.get('/order/:user-id', authUser, showUserOrder)
    app.post('/delete-order', authAdmin, deleteOrder)
}

export default order_routes
