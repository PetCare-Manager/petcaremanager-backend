import { UserRepository } from '../../domain/user/user.repository';
import { UserEntity } from '../../domain/user/user.entity';
import UserModel from './user.model';
import { UserUpdateProps } from '../../domain/user/user.value';

export class MongoRepository implements UserRepository {
    async createUser(user: Partial<UserEntity>): Promise<UserEntity | null> {
        try {
            const newUser = new UserModel(user);
            const savedUser = await newUser.save();
            return savedUser.toObject();
        } catch (error: any) {
            console.error('Error creating user:', error.errorResponse.errmsg);
            return null;
        }
    }
    async getUserById(userId: string): Promise<UserEntity | null> {
        try {
            const user = await UserModel.findOne({ userId: userId }).lean();
            return user || null;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            return null;
        }
    }
    async updateUser(
        userId: string,
        updatedData: UserUpdateProps,
    ): Promise<UserEntity | null> {
        try {
            const updatedUser = await UserModel.findOneAndUpdate(
                { userId: userId },
                { $set: updatedData },
                { new: true },
            ).lean();
            return updatedUser || null;
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }
    async deleteUser(userId: string): Promise<boolean> {
        try {
            const result = await UserModel.findOneAndDelete({
                userId: userId,
            }).lean();
            return result !== null;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }
}
