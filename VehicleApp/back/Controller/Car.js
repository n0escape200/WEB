import Car from "../Models/Car.js";
import User from "../Models/User.js";

export const createCar = async (req, res) => {
  try {
    const array = [];
    req.files.map((item) => {
      array.push(item.filename);
    });
    const payload = { ...req.body, photos: array };
    const newCar = new Car(payload);
    const savedCar = await newCar.save();
    const currentUser = await User.findById(req.params.id);
    if (currentUser) {
      currentUser.data.push(savedCar.id);
      await currentUser.save();
    } else {
      req.status(404).json("User error");
    }
    res.status(200).json(savedCar);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const findByIdCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json("Car was not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    const owner = car.owner;
    const user = await User.findById(owner);
    const updatedData = [];
    user.data.map((item) => {
      if (item != req.params.id) {
        updatedData.push(item);
      }
    });
    console.log(updatedData);
    await User.findByIdAndUpdate(owner, { data: updatedData });
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("Car deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getTodayCars = async (req, res) => {
  const curretDate = new Date();
  const formateDate = curretDate.toISOString().split("T")[0];
  const query = {
    createdAt: {
      $gte: new Date(`${formateDate}T00:00:00.000Z`),
      $lt: new Date(`${formateDate}T23:59:59.999Z`),
    },
  };
  try {
    const cars = await Car.find(query).limit(10);
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json(error);
  }
};
