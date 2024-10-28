import { Consumer, Kafka } from "kafkajs";

export class KafkaConfig {
  private comsumer: Consumer;
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: "producer",
      brokers: ["localhost:9092"],
    });
    this.comsumer = this.kafka.consumer({
      groupId: "test-group",
    });
  }
  async subscribe(topic: string){
    try{
        await this.comsumer.subscribe({topic,fromBeginning:true});
    }catch(error){
        console.log(`Something went wrong while subscribing to ${topic} topic`);
    }
  }
  async consume(onMessage:(message:string) => void){
     try{
        await this.comsumer.run({
            eachMessage:async({topic,partition,message})=>{
              message?.value && onMessage(message?.value.toString());
            }
        })
     }catch(error){
        console.log(`Something went wrong while consuming messages`);
     }
  }
  
  async connect(){
    try{
       await this.comsumer.connect();
       console.log("Consumer connected successfully");
    }catch(err:any){
       console.log("Something went wrong while connecting to Kafka");
    }
  }
  async disConnect(){
    try{
       await this.comsumer.connect();
       console.log("Consumer disConnected successfully");
    }catch(err:any){
       console.log("Something went wrong while disConnecting to Kafka");
    }
  }
  
}
