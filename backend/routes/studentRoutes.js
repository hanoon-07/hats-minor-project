import express from 'express'
import { getInfoOfStudent} from '../controllers/studentController.js'

const router = express.Router()

router.get('/studentInfo',getInfoOfStudent)


export default router