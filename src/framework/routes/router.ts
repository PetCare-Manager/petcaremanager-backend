import { Express, Router } from 'express';
import monitRouter from '../monit/monit';
import userRoutes from '../../adapters/routes/userRutes';

export const RouterBuilder = (app: Express) => {
    app.get('/', (req, res) => {
        res.send('¡Bienvenido a la API!');
    });
    app.use('/api/monit', monitRouter);

    app.use('/api/users', userRoutes);
};

export default { RouterBuilder };