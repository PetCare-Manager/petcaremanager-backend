import { Request, Response } from 'express';
import { CustomError, RestCodes } from '../../framework/errorFactory';
import { UserRepository } from '../../domain/user/user.repository';
import { CreateUserUseCase } from '../../application/user/createUser.usecase';
import { GetUserUseCase } from '../../application/user/getUser.usecase';
import { UpdateUserUseCase } from '../../application/user/updateUser.usecase';
import { DeleteUserUseCase } from '../../application/user/deleteUser.usecase';

export class UserController {
    private createUserUseCase: CreateUserUseCase;
    private getUserUseCase: GetUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private deleteUserUseCase: DeleteUserUseCase;

    constructor(private userRepository: UserRepository) {
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.getUserUseCase = new GetUserUseCase(userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    }

    public createUserCtrl = async (req: Request, res: Response) => {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(RestCodes.CODE_BAD_REQUEST).send(
                new CustomError(
                    'User not created',
                    RestCodes.CODE_BAD_REQUEST,
                ).toJson(),
            );
        }
    };

    public getUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            console.log(userId);
            const user = await this.getUserUseCase.execute(userId);
            res.status(200).send(user);
        } catch (error: any) {
            res.status(RestCodes.CODE_BAD_REQUEST).send(
                new CustomError(
                    'User not found',
                    RestCodes.CODE_BAD_REQUEST,
                ).toJson(),
            );
        }
    };

    public updateUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                req.body,
            );
            res.status(200).send(updatedUser);
        } catch (error: any) {
            res.status(RestCodes.CODE_BAD_REQUEST).send(
                new CustomError(
                    'User could not be updated',
                    RestCodes.CODE_BAD_REQUEST,
                ).toJson(),
            );
        }
    };

    public deleteUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await this.getUserUseCase.execute(userId);
            if (!user) {
                throw new Error();
            }
            await this.deleteUserUseCase.execute(userId);
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error: any) {
            res.status(RestCodes.CODE_BAD_REQUEST).send(
                new CustomError(
                    'User could not be deleted',
                    RestCodes.CODE_BAD_REQUEST,
                ).toJson(),
            );
        }
    };
}
