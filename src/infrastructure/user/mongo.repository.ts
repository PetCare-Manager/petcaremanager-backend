import { UserRepository } from '../../domain/user/user.repository';
import { UserEntity } from '../../domain/user/user.entity';
import UserModel from './user.model';
import { UserUpdateProps } from '../../domain/user/user.value';
import { CustomError, RestCodes } from '../../framework/errorFactory';

export class MongoRepository implements UserRepository {
    async createUser(user: Partial<UserEntity>): Promise<UserEntity | null> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser.toObject();
    }

    async getUserById(userId: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ userId: userId }).lean();
        return user || null;
    }

    async updateUser(
        userId: string,
        updatedData: UserUpdateProps,
    ): Promise<UserEntity> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { userId: userId },
            { $set: updatedData },
            { new: true },
        ).lean();
        if (!updatedUser) {
            throw new CustomError(
                `User with userId ${userId} not found.`,
                RestCodes.CODE_BAD_REQUEST,
            );
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const result = await UserModel.findOneAndDelete({
                userId: userId,
            }).lean();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}
