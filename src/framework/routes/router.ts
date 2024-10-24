import { Express } from 'express';
import monitRouter from '../monit/monit';
import { setupSwagger } from '../config/swagger';
import userRouter from '../../infrastructure/user/users.route';

export const RouterBuilder = (app: Express) => {
    app.use('/api/monit', monitRouter);
    app.use('/api/user', userRouter);
    setupSwagger(app);
};

export default { RouterBuilder };
