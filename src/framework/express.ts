import express, {Express} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import expressListRoutes from 'express-list-routes';
import { RouterBuilder } from './routes/router';

export default function expressConfig(app: Express) {
	app.use(express.json());

	const corsOptions = {
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	};
	app.use(cors(corsOptions));

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000,
		})
	);

	app.use((req, res, next) => {
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, PATCH, DELETE'
		);
		// Request headers you wish to allow
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
		);
		next();
	});
	app.use(morgan('dev'));
	RouterBuilder(app);

	if (process.env.NODE_ENV === 'local') {
		console.log("===== ROUTES ====");
		expressListRoutes(app);
		console.log("===== ROUTES ====");
	}
}