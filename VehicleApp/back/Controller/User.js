import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const searchUser = await User.findOne({ username: req.body.username });
    const serachEmail = await User.findOne({ email: req.body.email });
    if (searchUser || serachEmail) {
      res.status(409).json("There is a user already with these credentials");
    } else {
      bcrypt.hash(req.body.password, 12, async (_, hash) => {
        const newUser = new User({ ...req.body, password: hash });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    if (findUser) {
      bcrypt.compare(req.body.password, findUser.password, (_, result) => {
        if (result) {
          const token = jwt.sign({ findUser }, "randomKeyWillReplace");
          if (req.cookies.User == undefined) {
            res.cookie("User", token, {
              httpOnly: false,
              sameSite: "none",
              secure: true,
            });
          }
          res
            .status(200)
            .json({ token, message: "User found and logged in succesfully" });
        } else {
          res.status(401).json("User credentials incorrect");
        }
      });
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const findUserByIt = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    let data = req.body;
    if (data.password) {
      const hash = bcrypt.hashSync(data.password, 12);
      data = { ...data, password: hash };
    }
    const user = await User.findByIdAndUpdate(req.params.id, data);
    if (user) {
      res.status(200).json("User updated");
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const delteByID = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};
