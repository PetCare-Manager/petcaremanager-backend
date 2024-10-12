import { Request, Response } from 'express';
import { UserUseCase } from '../../application/user/userUseCase';

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    public createUserCtrl = async (req: Request, res: Response) => {
        try {
            const user = await this.userUseCase.createUser(req.body);
            if (!user) {
                res.status(400).send({ message: 'User not created' });
            }
            res.status(201).send(user);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
    public getUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            console.log(userId);
            const user = await this.userUseCase.getDetailsUser(userId);
            if (!user)
                return res.status(404).send({ message: 'User not found' });
            res.send(user);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public updateUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const updatedUser = await this.userUseCase.updateUser(
                userId,
                req.body,
            );
            if (!updatedUser)
                return res.status(404).send({ message: 'User not found' });
            res.send(updatedUser);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public deleteUserCtrl = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const isDeleted = await this.userUseCase.deleteUser(userId);
            if (!isDeleted)
                return res.status(404).send({ message: 'User not found' });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
}
