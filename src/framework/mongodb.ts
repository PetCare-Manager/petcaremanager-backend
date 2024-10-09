import 'dotenv/config';
import mongoose from 'mongoose';

export interface MongoParameters {
  host?: string;
  port?: string;
  database?: string;
  user?: string;
  password?: string;
  uri?: string;
}

export class MongoService {
	private uri: string;

	constructor() {
		if (!process.env.DB_URI) {
			throw new Error('DB_URI is not set as environment variable');
		}
		this.uri = process.env.DB_URI;
	}
	async connect() {
		mongoose.set('debug', true);
		await mongoose.connect(this.uri)
			.then(
				() => {},
				(err) => {
					throw new Error(`Error connecting with mongo: ${err}`);
				}
			)
			.catch((err) => {
				throw new Error(`Error connecting with mongo: ${err}`);
			});

		mongoose.connection.on('error', (error) => {
			mongoose.disconnect();
			throw new Error(`Error in MongoDb connection: ${error}`);
		});
	}

	close = () => {
		mongoose.disconnect();
	};
}