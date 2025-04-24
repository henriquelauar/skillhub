import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import { errorHandler } from './middleware/errorHandler';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("API funcionando.")
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})

app.use(routes)
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));