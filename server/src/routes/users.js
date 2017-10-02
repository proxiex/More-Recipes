import express from 'express';
import Users from '../controller/users';

const usersController = new Users();

let router = express.Router();

router.post('/', usersController.signup);

export default router;