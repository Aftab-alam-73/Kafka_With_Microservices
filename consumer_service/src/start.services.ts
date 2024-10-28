import { KafkaConfig } from "./config/kafka.config";
import { consumeTestMessages } from "./services/consume.test.messages";

export const startServices = async() =>{
    try{
        const kafka=new KafkaConfig();
        await kafka.connect();
        await kafka.subscribe("test-topic");
        await consumeTestMessages(kafka);
    }catch(error){
        console.log({error});
        process.exit(1);
    }
}