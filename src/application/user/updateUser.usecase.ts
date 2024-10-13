import { UserUpdateProps } from '../../domain/user/user.value';
import { UserEntity } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async (
        userId: string,
        props: UserUpdateProps,
    ): Promise<UserEntity> => {
        return await this.userRepository.updateUser(userId, props);
    };
}
