import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { MongoUserRepository } from '../../adapters/repositories/userRepo';

export class UserService {
  constructor(private userRepository: MongoUserRepository) {}

  async register(user: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
