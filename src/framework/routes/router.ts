import { Express } from 'express';
import monitRouter from '../monit/monit';
import { setupSwagger } from '../config/swagger';

export const RouterBuilder = (app: Express) => {
    app.use('/api/monit', monitRouter);

    setupSwagger(app);
};

export default { RouterBuilder };