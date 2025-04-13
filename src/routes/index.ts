import { Router } from 'express'
import userRoutes from './userRoutes'

const routes = Router()

routes.use('/users', userRoutes)

routes.get('/ping', (req, res) => {
    res.json({ message: 'pong'})
})

export default routes