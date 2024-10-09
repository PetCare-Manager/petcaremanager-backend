import { Request, Response, NextFunction, Router } from 'express';
import { CustomError, RestCodes } from '../errorFactory';

const monitRouter = Router();
monitRouter.get('/health', (req: Request, res: Response, _next: NextFunction) => {
	res.send(new CustomError('I\'am alive', RestCodes.CODE_OK).toJson());
});
 
export default monitRouter; 