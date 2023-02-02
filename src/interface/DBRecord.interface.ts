import { ManagedUpload } from "aws-sdk/clients/s3.js";

export interface DBRecord {
    key: ManagedUpload.SendData['Key'],
    bucket: ManagedUpload.SendData['Bucket'],
    etag: ManagedUpload.SendData['ETag'],
    date: number,
    cname: string,
    size: number,
    user: string[] | string
}