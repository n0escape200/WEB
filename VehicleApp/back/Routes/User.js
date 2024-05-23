import { Router } from "express";
import {
  findUserByIt,
  loginUser,
  registerUser,
  updateUserById,
} from "../Controller/User.js";

const router = Router();

//Login user
router.post("/login", loginUser);

//Register User
router.post("/register", registerUser);

//Gets user by id
router.get("/findUser/:id", findUserByIt);

//Updates user by id
router.post("/updateUser/:id", updateUserById);

export default router;
