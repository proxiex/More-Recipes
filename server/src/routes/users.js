import express from 'express';
import Users from '../controller/users';

const usersController = new Users();

let router = express.Router();

router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);

export default router;