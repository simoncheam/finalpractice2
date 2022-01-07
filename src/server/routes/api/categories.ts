import * as express from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import categoriesDB from '../../database/queries/categories'


const router = express.Router();



//get all ✅ OK

router.get('/',  async (req, res) => {

    try {
       const all_cats = await categoriesDB.get_all();
       res.status(200).json(all_cats);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

//get one ✅ OK
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const [one_cat] = await categoriesDB.get_one_by_id(id)
       res.status(200).json( one_cat);


    

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})




export default router;