import mongoose from "mongoose";

const careSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category :{type: String, required: true, default: "Punjabi"},
})

const careModel = mongoose.models.care || mongoose.model("care", careSchema);
export default careModel;