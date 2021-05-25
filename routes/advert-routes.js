import { Router } from 'express';
import auth from '../middleware/auth-middleware';
import { advertValidationParams } from '../middleware/validation-middleware';
import Controllers from '../controllers/AdvertControllers';

const router = Router();

router.post('/create', auth, advertValidationParams, Controllers.createAdvert);
router.get('/', auth, Controllers.getAllAdverts);
router.get('/byId/:id', auth, Controllers.getAdvertById);
router.get('/userAdverts', auth, Controllers.getCurrentUserAdverts);
router.get('/byOwnerName/:owner', auth, Controllers.getAdvertsByOwnerName);
router.get('/byTitle/:title', auth, Controllers.findAdvertByTitle);
router.patch('/editAdvert/:id', auth, Controllers.editAdvert);
router.delete('/deleteAdvert/:id', auth, Controllers.deleteAdvert);

export default router;
