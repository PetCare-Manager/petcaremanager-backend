import { Express } from 'express';
import monitRouter from '../monit/monit';

export const RouterBuilder = (app: Express) => {
    app.use('/api/monit', monitRouter);
};

export default { RouterBuilder };