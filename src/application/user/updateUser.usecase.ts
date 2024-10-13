import { UserUpdateProps } from '../../domain/user/user.value';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async (
        userId: string,
        props: UserUpdateProps,
    ): Promise<User> => {
        return await this.userRepository.updateUser(userId, props);
    };
}
