import express,{Request,Response} from 'express';

import { startServices } from './start.services';
import { kafka } from './start.services';
const PORT = process.env.PORT || 6000;

startServices();
const app = express();
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json("Welcome to message producer server!");
})

app.post('/produce-message',(req,res)=>{
    const message=req.body.message as string;
    try{

        kafka.produceMessages("test-topic",[{value:message}]);
        res.status(200).json({success:true,message:"Message sent successfully"});
    }catch(err:any){
        res.status(500).json({success:false,message:err.message});
    }
})


app.listen(PORT,()=>{
    console.log(`Serving is running on port ${PORT}`);
})