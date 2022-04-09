// find attribute 'password' and replace it's value with '*******'
import { user } from '../models/usermodel'

const hidePassword = (user: user): user => {
    return {
        ...user,
        password: '*******',
    }
}

export { hidePassword }
