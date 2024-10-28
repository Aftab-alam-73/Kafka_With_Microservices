import { KafkaConfig } from "./config/kafka.config";

export const kafka=new KafkaConfig();

export const startServices=async()=>{
    try{
       await kafka.connect();
       await kafka.createTopics("test-topic");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}