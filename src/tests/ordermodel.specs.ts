import { order, orderStore } from '../models/ordermodel'
import { user, userStore } from '../models/usermodel'

const store = new userStore()
const tab = new orderStore()
let user_id: number 

describe('order Model', () => {
    beforeAll(async () => {
        const user:user = await store.create({
            id: 1,
            username: 'Test_user',
            first_name: 'first',
            last_name: 'last',
            role: 'admin',
            password: 'test_password'
        })
        user_id = user.id as number
    })
    it('create method should add an order', async () => {
        const result = await tab.create({
            id: 1,
            user_id ,
            status:'active' 
        })
        delete result.created_at
        expect(result).toEqual({
            id: 1,
            user_id,
            status:'active' 
        })
    })

    it('should return a list of orders', async () => {
        const result: Array<order> = await tab.index()
        expect(result[0].created_at).toBeTruthy
    })

    it('should return correct order', async () => {
        const result = await tab.show('1')
        expect(result.created_at).toBeTruthy
    })

    it('should remove order', async () => {
        tab.delete('1')
        const result = await tab.show('1')
        expect(result).toBeFalsy
    })
})
