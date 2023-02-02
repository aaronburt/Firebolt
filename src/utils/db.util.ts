import mongodb, { MongoClient } from 'mongodb';
import { DBUtilError } from '../enums/DBUtilError.enum.js';

export default class DB {
    public username: string = "";
    public password: string = "";
    public cluster: string = "";
    public client: MongoClient | undefined = undefined;
    public connectionEstablished: boolean = false;

    constructor(username: string, password: string, cluster: string){
        this.client = new MongoClient(`mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`);
        this.connectToDb();
    }

    async connectToDb(){
        try {
            if(this.client === undefined) throw new Error(DBUtilError.ClientNotDefined);
            if(this.connectionEstablished) throw new Error(DBUtilError.ConnectionAlreadyEstablished)
            return this.connectionEstablished = !!await this.client.connect();
        } catch(err: any){
            return false;
        }
    }

    async getOne(database: string, collection: string, query: Record<any, any>){
        try {
            if(!this.connectionEstablished) await this.connectToDb();
            if(this.client === undefined) throw new Error(DBUtilError.ClientNotDefined);
            return await this.client.db(database).collection(collection).findOne(query);
        } catch(err: any){
            return false;
        }
    }

    async setOne(database: string, collection: string, query: Record<any, any>){
        try {
            if(!this.connectionEstablished) await this.connectToDb();
            if(this.client === undefined) throw new Error(DBUtilError.ClientNotDefined);
            return await this.client.db(database).collection(collection).insertOne(query);
        } catch(err: any){
            return false;
        }
    }
}