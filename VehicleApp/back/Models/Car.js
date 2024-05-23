import mongoose from "mongoose";

const carModel = mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    KM: {
      type: Number,
      required: true,
    },
    CC: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    photos: [String],
    owner: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carModel);
