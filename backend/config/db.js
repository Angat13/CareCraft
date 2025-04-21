import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://Angat:AngatSingh1313@cluster1313.ecpdi.mongodb.net/CARECRAFT').then(()=>console.log("DB Connected"));
   
}


