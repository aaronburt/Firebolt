export interface envInterface {

    server: {
        port: number
    },
    
    s3: {
        access_key_id: string,
        access_key_secret: string,
        endpoint: string,
        bucket: string,
        cname: string,
    },

    database: {
        username: string,
        password: string,
        cluster: string
    }
}