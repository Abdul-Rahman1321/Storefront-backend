import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { user, userStore } from '../models/usermodel'
import { hidePassword } from '../util/stars'

const jwtSecret = process.env.TOKEN_SECRET
const store = new userStore()

export const authAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const isValidJwt = jwt.verify(token, jwtSecret as string)
        if (!isValidJwt) {
            throw new Error()
        }
        const payload = jwt.decode(token)
        const user: user = await store.logUser(payload?.sub as string)
        if (!user) throw new Error()
        if (user.role !== 'admin') return res.send('needs admin authorization')
        res.locals.user = hidePassword(user)
        next()
    } catch (error) {
        return res.send('unauthorzied admin')
    }
}
