import { HttpStatus } from '../enums/httpStatus.enum.js';
import { signatureVersion } from '../enums/s3SignatureVer.enum.js';

import S3Util from '../utils/s3.util.js';
import env from '../env.js';

import { Request, RequestHandler, Response, Router } from 'express';
import multer from 'multer';
import RandomUtil from '../utils/rand.util.js';
import DB from '../utils/db.util.js';
import { DBRecord } from '../interface/DBRecord.interface.js';

const upload: RequestHandler = multer({ storage: multer.memoryStorage() }).single('file');
const router: Router = Router();

const s3 = new S3Util(env.s3.endpoint, env.s3.bucket, env.s3.access_key_id, env.s3.access_key_secret, signatureVersion.v4);
const db = new DB(env.database.username, env.database.password, env.database.cluster);

router.post('/', async(req: Request, res: Response) => {
    try {
        upload(req, res, async(err) => {
            if(err) return res.sendStatus(HttpStatus.BAD_REQUEST);
            if(!req.file) return res.sendStatus(HttpStatus.BAD_REQUEST);

            const upload = await s3.uploadFileBuffer(new RandomUtil(8).generate(), req.file);
            if(!upload) return res.sendStatus(HttpStatus.BAD_REQUEST);

            const databaseRecord: DBRecord = {
                key: upload.Key,
                bucket: upload.Bucket,
                etag: upload.ETag,
                date: Date.now(),
                cname: env.s3.cname,
                size: req.file.size,
                user: req.headers['x-auth-username'] || ''
            };

            await db.setOne('firewire', 'content', databaseRecord);
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, response: `${env.s3.cname}/${upload.Key}`, db: databaseRecord });
        });
    } catch(err: any){
        return res.sendStatus(HttpStatus.BAD_REQUEST);
    }
});

export default router;
