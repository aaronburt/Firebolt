/* Import statement */ 
import { HttpStatus } from './enums/httpStatus.enum.js';
import express, { Request, Response } from 'express';
import uploadMiddleware from './middlewares/upload.middleware.js'
import authMiddleware from './middlewares/auth.middleware.js';
import env from './env.js';

const app: express.Application = express();

app.use('*', authMiddleware);

app.use('/upload', uploadMiddleware);

app.all('*', (req: Request, res: Response) => { return res.sendStatus(HttpStatus.NOT_FOUND); });

app.listen(env.server.port, () => { console.log(env.server.port) });
