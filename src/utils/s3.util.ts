import { signatureVersion } from '../enums/s3SignatureVer.enum.js';
import { S3UtilError } from '../enums/S3UtilError.enum.js';
import S3 from 'aws-sdk/clients/s3.js';

export default class S3Util implements S3.ClientConfiguration {
    public bucket: string = "";
    public endpoint: string = "";
    public accessKey: string = "";
    public accessKeySecret: string = "";
    public signatureVersion: signatureVersion = signatureVersion.v4;
    public s3Client: S3 | undefined = undefined;

    constructor(endpoint: string, bucket: string, accessKey: string, accessKeySecret: string, signatureVersion: signatureVersion){
        Object.assign(this, { endpoint, accessKey, accessKeySecret, signatureVersion, bucket });
        this.establishClient();
    }

    async establishClient(){
        this.s3Client = new S3({
            endpoint: this.endpoint,
            accessKeyId: this.accessKey,
            secretAccessKey: this.accessKeySecret,
            signatureVersion: this.signatureVersion
        });
    }

    async uploadFileBuffer(keyName: string, file: Express.Multer.File){
        try {
            if(this.s3Client === undefined) throw new Error(S3UtilError.S3ClientNotDefined);

            const s3ClientParams: S3.Types.PutObjectRequest = {
                Key: keyName,
                Body: file.buffer,
                Bucket: this.bucket,
                ContentType: file.mimetype,
                ContentDisposition: `inline; filename="${file.originalname}"`
            };

            return await this.s3Client.upload(s3ClientParams).promise();
        } catch(err: any){
            return false;
        }
    }
}