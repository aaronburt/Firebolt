/* MAKE SURE TO RENAME THIS TO env.ts WHEN USING IN PRODUCTION */ 
/* TSC --WATCH WILL ALSO PLACE A PRODUCTION VERSION OF THIS IN DIST FOLDER */
import { envInterface } from "./interface/env.interface.js"

const env: envInterface = {
    server: {
        port: 80
    },

    s3: {
        access_key_id: "",
        access_key_secret: "",
        endpoint: "",
        bucket: "",
        cname: "",
    },
    
    database: {
        username: "",
        password: "",
        cluster: ""
    }
}

export default env;
