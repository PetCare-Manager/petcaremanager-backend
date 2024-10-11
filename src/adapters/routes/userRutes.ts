import { Router, Request, Response } from 'express';
import { UserService } from '../../domain/services/userService';
import { MongoUserRepository } from '../../adapters/repositories/userRepo';

const router = Router();
const userRepository = new MongoUserRepository(); 
const userService = new UserService(userRepository); 

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await userService.register({ email, password, role: 'user' });
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
