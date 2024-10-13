import { UserEntity } from './user.entity';
import { UserUpdateProps } from './user.value';

export interface UserRepository {
    createUser(user: UserEntity): Promise<UserEntity | null>;
    getUserById(userId: string): Promise<UserEntity | null>;
    updateUser(
        userId: string,
        updatedData: UserUpdateProps,
    ): Promise<UserEntity>;
    deleteUser(userId: string): Promise<void>;
}
