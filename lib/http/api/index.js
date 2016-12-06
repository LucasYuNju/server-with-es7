import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
    // Use the following code to block illegal code.
    // res.status(403).end("Forbidden");
    next();
});

router.use("/tpi", require("../../tpi/api").default);

export default router;
