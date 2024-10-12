import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    email: string;
    password: string;
    name: string;
    description: string;
    avatarUrl: string;
    accessId: string;
    role: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        userId: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        avatarUrl: {
            type: String,
            default: '',
        },
        accessId: {
            type: String,
            default: '',
        },
        role: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
