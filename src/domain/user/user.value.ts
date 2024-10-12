import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';

export interface UserUpdateProps {
    name?: string;
    description?: string;
    avatarUrl?: string;
}

export class UserValue implements UserEntity {
    userId: string;
    name: string;
    email: string;
    password: string;
    description: string;
    avatarUrl: string;
    address: string;
    accessId: string;
    role: string; //TODO entity to define

    constructor({ email, password }: { email: string; password: string }) {
        this.userId = uuid();
        this.name = '';
        this.email = email;
        this.description = '';
        this.avatarUrl = '';
        this.address = '';
        this.accessId = '';
        this.password = password;
        this.role = 'user';
    }

    updatedetails({ name, description, avatarUrl }: UserUpdateProps) {
        if (name) this.name = name;
        if (description) this.description = description;
        if (avatarUrl) this.avatarUrl = avatarUrl;
    }
}
