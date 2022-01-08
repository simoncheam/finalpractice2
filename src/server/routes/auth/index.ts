// import express Router
import { Router } from 'express';

// import all the sibling router files
import loginRouter from './login';
import registerRouter from './register';
import validateRouter from './validate';

// define router from function
const router = Router();

//defind use path and name
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/validate', validateRouter);

//export the final router setup
export default router; 