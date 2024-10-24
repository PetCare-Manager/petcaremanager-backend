import { UserValue } from '../../domain/user/user.value';
import { UserRepository } from '../../domain/user/user.repository';
import { UserPresenter } from '../../domain/user/user.presenter';
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<UserPresenter | null> => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserValue({ email, password: hashPassword });
        if (!user) return null;
        const createdUser = await this.userRepository.createUser(user);
        if (!createdUser) return null;

        return new UserPresenter(createdUser);
    };
}
