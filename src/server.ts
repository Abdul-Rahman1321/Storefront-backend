import express, { Application } from 'express'
import cors from 'cors'
import user_routes from './handlers/userhandler'
import morgan from 'morgan'
import helmet from 'helmet'
import product_routes from './handlers/producthandler'
import order_routes from './handlers/orderhandler'

const app: Application = express() // create an express application
const port = 3000 // default port to listen

// Defaul middlewares // parse application/json
app.use(cors(), helmet(), morgan('dev'), express.json())

// Routes
app.get('/', (_req, res) => {
    res.send('Hello World!')
})

user_routes(app)
product_routes(app)
order_routes(app)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
})

export default app
