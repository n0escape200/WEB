import mongoose from "mongoose";

const schema = mongoose.model("data", new mongoose.Schema(), "data");

export const getData = async (req, res) => {
  try {
    const Data = await schema.find();
    res.status(200).json(Data);
  } catch (error) {
    res.status(400).json(error);
  }
};
