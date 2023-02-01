import { Router, Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../enums/httpStatus.enum.js';
import DB from '../utils/db.util.js';
import env from '../env.js';
import { DBResult } from '../interface/DBResult.interface.js';

const db = new DB(env.database.username, env.database.password, env.database.cluster);

const router: Router = Router();

router.all('*', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const xAuthUsername: string | undefined = req.headers['x-auth-username']?.toString() || undefined;
        const xAuthPassword: string | undefined = req.headers['x-auth-password']?.toString() || undefined;

        if(xAuthUsername === undefined || xAuthPassword === undefined) return res.sendStatus(HttpStatus.UNAUTHORIZED);

        const result: DBResult = await db.getOne('firewire', 'authentication', { username: xAuthUsername, password: xAuthPassword });
        if(result === null) return res.sendStatus(HttpStatus.UNAUTHORIZED);
        return next();   
    } catch(err: any){
        return res.sendStatus(500);
    }
});

export default router;
