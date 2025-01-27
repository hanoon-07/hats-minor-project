import express from 'express';
import testRoute from './routes/testRoutes.js';
import cors from 'cors';
import examRoute from './routes/examRoutes.js';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*', // Vite React frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));


app.use('', testRoute); // endpoint is /testserver
app.use('', examRoute) // endpoin is /exam

export default app;