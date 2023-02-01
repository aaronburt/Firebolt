import { BufferEncoding } from '../enums/bufferEncoding.enum.js';
import crypto from 'crypto';

export default class RandomUtil {

    public length: number = 12;
    public encoding: BufferEncoding = BufferEncoding.HEX;

    constructor(length: number, encoding: BufferEncoding = BufferEncoding.HEX){
        Object.assign(this, { length, encoding });
    }

    generate(){
        return crypto.randomBytes(this.length).toString(this.encoding);
    }
}