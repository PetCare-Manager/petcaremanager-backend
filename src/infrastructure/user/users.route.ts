import { Router } from 'express';
import { MongoRepository } from './mongo.repository';
import { UserController } from './user.controller';
const router = Router();
const userRepo = new MongoRepository();
const useCtrl = new UserController(userRepo);

router.post('/', useCtrl.createUserCtrl);
router.get('/:id', useCtrl.getUserCtrl);
router.patch('/:id', useCtrl.updateUserCtrl);
router.delete('/:id', useCtrl.deleteUserCtrl);

export default router;
