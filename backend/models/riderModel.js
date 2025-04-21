import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
  riderId: { type: Number, required: true, unique: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  available: { type: Boolean, default: true },
});

// Initialize riders (only run once)
riderSchema.statics.initializeRiders = async function () {
  const existingRiders = await this.find();
  if (existingRiders.length === 0) {
    await this.insertMany([
      { riderId: 2, location: { lat: 19.1400, lng: 72.8295 }, available: true },
      { riderId: 3, location: { lat: 19.1380, lng: 72.8260 }, available: true },
    ]);
    console.log("Riders initialized");
  }
};

const Rider = mongoose.model("Rider", riderSchema);
export default Rider;