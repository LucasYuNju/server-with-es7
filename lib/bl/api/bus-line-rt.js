import { Router } from "express";

import BlInfoService from "../logic/BlInfoService";

const router = Router();
const blService = new BlInfoService();


export default router;
