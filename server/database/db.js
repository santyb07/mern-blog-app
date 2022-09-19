import mongoose from "mongoose";


const connection= async(USERNAME,PASSWORD)=>{
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-s43emji-shard-00-00.kjheylq.mongodb.net:27017,ac-s43emji-shard-00-01.kjheylq.mongodb.net:27017,ac-s43emji-shard-00-02.kjheylq.mongodb.net:27017/?ssl=true&replicaSet=atlas-9y7sf8-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true,
        })
        console.log('connection successfull.');
    }catch(error){
        console.log("error while connecting with the database",error);
    }
}
export default connection;