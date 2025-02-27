import express from 'express';
import testRoute from './routes/testRoutes.js';
import cors from 'cors';
import examRoute from './routes/examRoutes.js';
import pool from './config/db.js';

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

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("select now()");
        res.json({Sucess: true, msg: result.rows[0]});
    } catch(error) {
        console.log("Data base error: ",error);
        res.status(500).json({error_message: error.message });
    }
});


export default app;