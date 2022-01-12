
//✅ OK
import { Router } from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';


const router = Router();


router.get('/', tokenCheck, async (req, res) => {
    console.log('inside validate route')

    res.status(200).json({ message: 'valid' });

})
export default router; 