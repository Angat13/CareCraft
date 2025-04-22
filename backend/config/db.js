import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('YOUR MONGODB KEY').then(()=>console.log("DB Connected"));
   
}


