import { UserPresenter } from '../../domain/user/user.presenter';
import { UserRepository } from '../../domain/user/user.repository';

export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async (userId: string): Promise<UserPresenter | null> => {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return null;
        return new UserPresenter(user);
    };
}
