import express from 'express'
import { getInfoOfStudent, getResultsOfStudent, getPast6Scores} from '../controllers/studentController.js'

const router = express.Router()

router.get('/getStudentInfo',getInfoOfStudent)
router.get('/getResultForStudent',getResultsOfStudent)
router.get('/getPast6Scores',getPast6Scores)




export default router