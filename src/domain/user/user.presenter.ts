import { User } from './user.entity';

export class UserPresenter {
    private email: string;
    private userId: string;
    private name: string;
    private description: string;
    private avatarUrl: string;

    constructor(user: User) {
        this.email = user.email;
        this.userId = user.userId;
        this.name = user.name;
        this.description = user.description;
        this.avatarUrl = user.avatarUrl;
    }

    public toJson() {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            description: this.description,
            avatarUrl: this.avatarUrl,
        };
    }
}
