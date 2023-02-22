const mongoose=require('mongoose');
const mongoURI="mongodb+srv://Garvit7118:Garvit7118@cluster0.h80mt2e.mongodb.net/iNotebook";
mongoose.set('strictQuery', true); 

const connectToMongo = async()=>{  
    try{
        await mongoose.connect(mongoURI,()=>{
            console.log("Connected to mongo."); 
        }) 
    }
    catch(err){
        console.log(err);
    }
}
module.exports=connectToMongo;