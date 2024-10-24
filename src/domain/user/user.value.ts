import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

export interface UserUpdateProps {
    name?: string;
    description?: string;
    avatarUrl?: string;
}

export class UserValue implements User {
    userId: string;
    name: string;
    email: string;
    password: string;
    description: string;
    avatarUrl: string;
    accessId: string;

    constructor({ email, password }: { email: string; password: string }) {
        this.userId = uuid();
        this.name = '';
        this.email = email;
        this.description = '';
        this.avatarUrl = '';
        this.accessId = '';
        this.password = password;
    }

    updatedetails({ name, description, avatarUrl }: UserUpdateProps) {
        if (name) this.name = name;
        if (description) this.description = description;
        if (avatarUrl) this.avatarUrl = avatarUrl;
    }
}
