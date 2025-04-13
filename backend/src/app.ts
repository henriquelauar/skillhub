// src/app.ts
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando.');
});

app.use(routes);

export default app;
