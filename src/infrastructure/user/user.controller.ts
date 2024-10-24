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
            if (!user) {
                return res
                    .status(RestCodes.CODE_BAD_REQUEST)
                    .send(
                        new CustomError(
                            'User not created',
                            RestCodes.CODE_BAD_REQUEST,
                        ).toJson(),
                    );
            }
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send(
                new CustomError(
                    'Internal server error',
                    RestCodes.INTERNAL_SERVER_ERROR,
                ).toJson(),
            );
        }
    };

    public getUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await this.getUserUseCase.execute(userId);
            if (!user) {
                return res
                    .status(RestCodes.CODE_NO_CONTENT)
                    .send(
                        new CustomError(
                            'User not found',
                            RestCodes.CODE_NO_CONTENT,
                        ).toJson(),
                    );
            }
            res.status(200).send(user);
        } catch (error: any) {
            res.status(500).send(
                new CustomError(
                    'Internal server error',
                    RestCodes.INTERNAL_SERVER_ERROR,
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
            if (error.message.includes('not found')) {
                res.status(RestCodes.CODE_BAD_REQUEST).send(
                    new CustomError(
                        'User could not be updated',
                        RestCodes.CODE_BAD_REQUEST,
                    ).toJson(),
                );
            }
            res.status(500).send(
                new CustomError(
                    'Internal server error',
                    RestCodes.INTERNAL_SERVER_ERROR,
                ).toJson(),
            );
        }
    };

    public deleteUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await this.getUserUseCase.execute(userId);
            if (!user) {
                res.status(RestCodes.CODE_NO_CONTENT).send(
                    new CustomError(
                        'User not found',
                        RestCodes.CODE_NO_CONTENT,
                    ).toJson(),
                );
            }
            await this.deleteUserUseCase.execute(userId);
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error: any) {
            res.status(500).send(
                new CustomError(
                    'Internal server error',
                    RestCodes.INTERNAL_SERVER_ERROR,
                ).toJson(),
            );
        }
    };
}
