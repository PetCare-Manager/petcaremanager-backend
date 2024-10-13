import { UserEntity } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';

export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async (userId: string): Promise<UserEntity | null> => {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return null;
        return user;
    };
}
