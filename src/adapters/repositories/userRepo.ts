import UserModel, { IUser } from './userModel';
import { User } from '../../domain/models/user';

export class MongoUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async save(user: User): Promise<void> {
    const newUser = new UserModel(user);
    await newUser.save();
  }
}
