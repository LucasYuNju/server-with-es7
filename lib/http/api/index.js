import { Router } from "express";

const router = Router();
router.use((req, res, next) => {
    console.log(`Client request to /api/** intercepted.`);
    next();
    // return next(req, res);
});
router.use("/tpi", require("../../tpi/api").default);

export default router;
