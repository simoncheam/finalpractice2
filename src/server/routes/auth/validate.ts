
//✅ OK
import {Router} from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';


const router = Router();


router.get('/', tokenCheck, async(req , res) => {

    res.status(200).json( {message: 'valid user!'});

})
export default router; 