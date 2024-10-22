import { UserUpdateProps } from '../../domain/user/user.value';
import { UserPresenter } from '../../domain/user/user.presenter';
import { UserRepository } from '../../domain/user/user.repository';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async (
        userId: string,
        props: UserUpdateProps,
    ): Promise<UserPresenter | null> => {
        const updatedUser = await this.userRepository.updateUser(userId, props);
        if (!updatedUser) return null;

        return new UserPresenter(updatedUser);
    };
}
