import { Router } from "express";
import { getData } from "../Controller/Data.js";

const router = Router();

router.get("/getData", getData);

export default router;
