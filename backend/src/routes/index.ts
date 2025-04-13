import { Router } from 'express'
import userRoutes from './userRoutes'
import skillRoutes from './skillRoutes'

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/skills', skillRoutes);

export default routes;