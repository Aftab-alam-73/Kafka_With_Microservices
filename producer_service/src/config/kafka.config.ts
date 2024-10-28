import { Admin, Kafka, Message, Producer } from "kafkajs";


export class KafkaConfig{
    private kafka: Kafka;
    private admin:Admin;
    private producer:Producer;

    constructor(){
        this.kafka=new Kafka({
            clientId:"producer",
            brokers:["localhost:9092"]
        });
        this.admin=this.kafka.admin();
        this.producer=this.kafka.producer();
    }

    async connect(){
        try{
            await this.admin.connect();
            await this.producer.connect();
            console.log("Kafka client connected successfully.");
        }catch(error){
            throw new Error("Something went wrong while connecting to Kafka");
        }
    }
    async disconnect(){
        try{
              await this.admin.disconnect();
              await this.producer.disconnect();
        }catch(error){
            throw new Error("Something went wrong while disconnecting from Kafka");
        }
    }
    async createTopics(topic:string){
        try{
           const existedTopics=await this.admin.listTopics();
           if(existedTopics.includes(topic)){
             console.log(`Topic ${topic} already exists.`);
             return;
           }
           await this.admin.createTopics({
            topics:[{topic}]
           })
           console.log("Topic created successfully")
        }catch(error){
            throw new Error("Failed to create Kafka topic");
        }
    }
   async produceMessages(topic: string, messages: Message[]){
      try{
         await this.producer.send({
            topic,
            messages
         })
         console.log(`Successfully produced ${messages.length} messages to topic ${topic}`);
      }catch(error){
        console.log("Failed to produce messages to Kafka",error);
      }
   }
}