import { Router } from 'express';
import auth from '../middleware/auth-middleware';
import { userValidationParams, loginValidationParams } from '../middleware/validation-middleware';
import Controllers from '../controllers/UserControllers';

const router = Router();

router.post('/register', userValidationParams, Controllers.createUser2);
router.post('/login', loginValidationParams, Controllers.loginUser2);
router.get('/', auth, Controllers.getAllUsers2);
router.get('/user/:id', auth, Controllers.getUserById2);
router.get('/byUserName/:userName', auth, Controllers.getUserByUserName2);
router.patch('/editUser/:id', auth, Controllers.editUser2);
router.delete('/deleteUser/:id', auth, Controllers.deleteUser2);

export default router;
