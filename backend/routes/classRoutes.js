import express from 'express'
import { getAllClassOfStudent, joinClass, getSomeClassInfo } from '../controllers/classController.js'

const router = express.Router()

router.get('/allClassInfo',getAllClassOfStudent)
router.post('/joinClass',joinClass)
router.get('/someClassInfo',getSomeClassInfo)

export default router