import express from 'express';
import testRoute from './routes/testRoutes.js';

const app = express();
app.use(express.json());

app.use('', testRoute); // endpoint is /testserver

export default app;