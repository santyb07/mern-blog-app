

import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv"
import multer from "multer"

dotenv.config();

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;

const storage= new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@ac-s43emji-shard-00-00.kjheylq.mongodb.net:27017,ac-s43emji-shard-00-01.kjheylq.mongodb.net:27017,ac-s43emji-shard-00-02.kjheylq.mongodb.net:27017/?ssl=true&replicaSet=atlas-9y7sf8-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options:{ useNewUrlParser: true},
    file:(request, file)=>{
        const match= ["image/png","image/jpg"];

        if(match.indexOf(file.memeType)=== -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});