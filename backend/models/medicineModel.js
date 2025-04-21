import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String,required:true}
})

const medicineModel = mongoose.models.medicine || mongoose.model("medicine", MedicineSchema);
export default medicineModel;