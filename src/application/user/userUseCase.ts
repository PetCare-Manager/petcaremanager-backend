import { UserEntity } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { UserValue, UserUpdateProps } from '../../domain/user/user.value';
import bcrypt from 'bcrypt';

export class UserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public createUser = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<UserEntity | null> => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserValue({ email, password: hashPassword });
        if (!user) return null;
        return await this.userRepository.createUser(user);
    };

    public getDetailsUser = async (
        userId: string,
    ): Promise<Partial<UserEntity> | null> => {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return null;
        const { password, ...userDetails } = user;
        return userDetails;
    };
    public async updateUser(
        userId: string,
        props: UserUpdateProps,
    ): Promise<UserEntity | null> {
        if (!this.validateUserUpdateProps(props)) return null;
        return await this.userRepository.updateUser(userId, props);
    }

    public async deleteUser(userId: string): Promise<boolean> {
        return await this.userRepository.deleteUser(userId);
    }

    // public async getAllUsers(): Promise<any[]> {
    //     return await this.userRepository.getAllUsers();
    // }

    private validateUserUpdateProps(props: UserUpdateProps) {
        const { description, avatarUrl } = props;
        // TODO  validations?
        return true;
    }
}
