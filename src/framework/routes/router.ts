import { Express } from 'express';
import monitRouter from '../monit/monit';
import { setupSwagger } from '../config/swagger';
import authRouter from "./auth"

export const RouterBuilder = (app: Express) => {
    app.use('/api/monit', monitRouter);
    app.use('/auth', authRouter);
    setupSwagger(app);
};

export default { RouterBuilder };