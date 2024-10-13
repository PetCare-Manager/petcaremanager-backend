import { Document, Schema, model } from 'mongoose';
import { UserEntity } from '../../domain/user/user.entity';

export interface IUser extends Document, UserEntity {}

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
