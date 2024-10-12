import { Router } from 'express';
import { MongoRepository } from './mongo.repository';
import { UserController } from './user.controller';
import { UserUseCase } from '../../application/user/userUseCase';
const router = Router();
const userRepo = new MongoRepository();
const userUseCase = new UserUseCase(userRepo);
const useCtrl = new UserController(userUseCase);

router.post('/', useCtrl.createUserCtrl);
router.get('/:id', useCtrl.getUserCtrl);
router.patch('/:id', useCtrl.updateUserCtrl);
router.delete('/:id', useCtrl.deleteUserCtrl);

export default router;
