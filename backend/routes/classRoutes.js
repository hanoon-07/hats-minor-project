import express from 'express'
import { getAllClassOfStudent, joinClass } from '../controllers/classController.js'

const router = express.Router()

router.get('/allClassInfo',getAllClassOfStudent)
router.post('/joinClass',joinClass)

export default router