import { KafkaConfig } from "../config/kafka.config"


export const consumeTestMessages = async(kafka:KafkaConfig) =>{
    try{
        await kafka.consume((message:string) =>{
            console.log(`Received message: ${message}`);
        })
    }catch(error){
        console.log("Error inside consumeTestMessages function");
    }
}