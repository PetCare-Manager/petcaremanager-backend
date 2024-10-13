import { UserRepository } from '../../domain/user/user.repository';

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    public execute = async (userId: string): Promise<void> => {
        return await this.userRepository.deleteUser(userId);
    };
}
