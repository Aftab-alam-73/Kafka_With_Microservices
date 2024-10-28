import express,{Request,Response} from 'express';
import { startServices } from './start.services';
const PORT = process.env.PORT || 3000;

const app = express();
startServices();

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json("Welcome to message consumer server!");
})

app.listen(PORT,()=>{
    console.log(`Serving is running on port ${PORT}`);
})