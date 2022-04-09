import { user, userStore } from '../models/usermodel'

const store = new userStore()

describe('user Model', () => {
    it('should return a list of users', async () => {
        const result: Array<user> = await store.index()
        delete result[0].password
        expect(result[0].first_name).toEqual('first')
    })

    it('should return correct user', async () => {
        const result = await store.show('1')
        delete result.password
        delete result.id
        expect(result.username).toEqual('Test_user')
    })

    it('should remove user', async () => {
        store.delete('Test_user')
        store.delete('Test')
        const result = await store.index()

        expect(result).toEqual([])
    })
})
