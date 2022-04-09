import express, { Request, Response } from 'express'
import { user, userStore } from '../models/usermodel'
import userService from '../service/userservice'
import { authUser } from '../middlerwares/authmiddle'
import { authAdmin } from '../middlerwares/rolechecker'

const store = new userStore()
const service = userService

const listUsers = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {
        console.log('couldnot list users ' + error)
    }
}

const showUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id as string
    try {
        const user = await store.show(userId)
        res.json(user)
    } catch (error) {
        console.log('cannot show user with id ' + userId)
    }
}

const registerUser = async (req: Request, res: Response) => {
    console.log({
        req: req.body,
    })
    try {
        const newUser = await service.register(req)
        console.log(newUser)
        res.json(newUser)
    } catch (error) {
        console.log('create handler failed : ' + error)
    }
}

const logInUser = async (req: Request, res: Response) => {
    try {
        const authenticatedUser = await service.login(req)
        if (authenticatedUser) {
            res.json('user is logged in sucessfully')
        } else {
            return res.send('cannot login user')
        }
    } catch (error) {
        return error
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.body.id
    try {
        const user: user = await store.show(userId)
        const deletedUser: user = await store.delete(userId)
        console.log('deleted user is : ' + deletedUser)
        res.json(user.username)
    } catch (error) {
        console.log(`couldn't delete user with id ${userId} err: ${error}`)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', authUser, listUsers)
    app.post('/register', registerUser)
    app.get('/user/:id', authAdmin, showUser)
    app.post('/delete-user', authAdmin, deleteUser)
    app.post('/login', logInUser)
}

export default user_routes
