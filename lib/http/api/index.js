import { Router } from "express";

const router = Router();

router.use("/tpi", require("./tpi").default);

export default router;
