import { Router } from "express";

import BlService from "../logic/BlService";

const router = Router();
const blService = new BlService();

router.get("/bus-line/:lineId-:direction/info", async (req, res) => {
    try
    {
        const rows = await blService.getBusLineInfo(req.params.lineId, req.params.direction);
        res.setHeader("Cache-Control", `max-age=${60 * 60 * 24 * 365}`);
        res.send(rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).end();
    }
});

export default router;
