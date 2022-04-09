import { Request, Response } from 'express'
import { userStore } from '../models/usermodel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthObject, user } from '../models/usermodel'
import { hidePassword } from '../util/stars'

const store = new userStore()
const pepper = process.env.BCRYPT_PASSWORD_PEPPER
const jwtSecret = process.env.TOKEN_SECRET

const authToken = (user: user): AuthObject => {
    const generatedToken = jwt.sign(
        { sub: user.username, name: `${user.first_name} ${user.last_name}` },
    jwtSecret as string,
    { expiresIn: '30d' }
    )
    return {
        token: generatedToken,
        user: hidePassword(user),
    }
}

export default class userService {
    static login = async (req: Request): Promise<AuthObject | null> => {
        const { username, password } = req.body
        const user = await store.logUser(username)
        if (!user) {
            return null
        }
        const isMatch = bcrypt.compareSync(
            password + pepper,
      user.password as string
        )
        if (!isMatch) {
            return null
        }
        console.log('user is logged in')
        return authToken(user)
    }
    static register = async (req: Request) => {
        const user = req.body
        const createdUser = await store.create(user)
        return authToken(createdUser)
    }
}

export const authUser = (res: Response) => res.locals.user
