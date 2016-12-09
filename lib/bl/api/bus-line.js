import { Router } from "express";

import BlInfoService from "../logic/BlInfoService";

const router = Router();
const blService = new BlInfoService();

router.get("/:lineId-:direction/info", async (req, res) => {
    try
    {
        const rows = await blService.getBusLineInfo(req.params.lineId, req.params.direction);
        res.cacheControl({ maxAge: "5min" });
        res.send(rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).end();
    }
});

export default router;
