import * as express from 'express';
import { Books } from '../../types';


import { tokenCheck } from '../../middleware/tokenCheck.mw';
import booksDB from '../../database/queries/books'

const router = express.Router();

//get all ✅ OK
router.get('/', async (req, res) => {

    try {
        const results = await booksDB.get_all_joined();
        res.status(200).json(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

// get one ✅ OK
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const [oneBookresults] = await booksDB.get_one_by_id(id);

        if (!oneBookresults) {
            res.status(201).json({ message: "Book doesn't exist!" });
        }

        res.status(200).json(oneBookresults);



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

// post
router.post('/', tokenCheck, async (req, res) => {

    const { title, author, price, categoryid } = req.body



    if (!title || !author || !price || !categoryid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }




    try {
        const newBookresults = await booksDB.create({ title, author, price, categoryid });
        res.status(200).json({ message: 'new book added', title });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//put ✅ OK
router.put('/:id', tokenCheck, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { title, author, price, categoryid } = req.body

        const bookUpdateResults = await booksDB.update({ title, author, price, categoryid }, id);

        if (bookUpdateResults.affectedRows) {

            res.status(201).json({ message: "Updated Book!" }); //*tk

        } else {
            res.status(401).json({ message: "Not updated!" }) //*tk;    
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//delete ✅ OK
router.delete('/:id', tokenCheck, async (req, res) => {

    const id = Number(req.params.id);


    try {
        await booksDB.destroy(id);
        res.status(201).json({ message: "Deleted!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;