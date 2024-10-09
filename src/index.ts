import 'dotenv/config';
import { MongoService } from './framework/mongodb';
import { app } from './server';
const PORT = process.env.PORT || 3001; 

const mongo = new MongoService();
mongo.connect();
 
const server = app.listen(PORT, () => {
    console.log(`**** PET CARE (${process.env.NODE_ENV}) listening on ${PORT} ====`);
});
export { app, server, mongo }; 