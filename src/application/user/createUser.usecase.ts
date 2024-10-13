import { UserValue } from '../../domain/user/user.value';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    public execute = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<User | null> => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserValue({ email, password: hashPassword });
        if (!user) return null;
        return await this.userRepository.createUser(user);
    };
}
