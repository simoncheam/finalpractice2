import * as express from 'express';
import { Users } from '../../types'
import usersDB from '../../database/queries/users'

const router = express.Router();


//get all✅ OK
router.get('/', async (req, res) => {

    try {
        const allUsers = await usersDB.get_all();
        
        // never send PWs to front end!!!
        allUsers.forEach(u=>{
            delete u.password;
        })
       

        res.status(200).json({ allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

//get one by id ✅ OK
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const [oneUser] = await usersDB.get_one_by_id(id);
        delete oneUser.password;

        res.status(200).json({ oneUser });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//post ✅ OK
router.post('/', async (req, res) => {

    //users
    const { name, email, password }: Users = req.body;

    //input validation

    if (!name || !email || !password) {  // input validation // 
        return res.status(400).json({ message: "Fill out everything!" })
    }


    try {
        const userResults = await usersDB.create({ name, email, password });
        res.status(200).json({ message: 'new user created!', userResults });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//delete ✅ OK
router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);


    try {
        await usersDB.destroy(id);
        res.status(200).json({ message: 'user deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;