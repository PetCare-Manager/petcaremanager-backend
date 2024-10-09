import express from 'express';
import 'dotenv/config';
import expressConfig from './framework/express';

const app = express();
expressConfig(app);

export { app }; 