import express from 'express';
import { testServer } from '../controllers/testController.js';

const router = express.Router();

router.get('/testserver', testServer);

export default router;