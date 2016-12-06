import { Router } from "express";

import BlService from "../logic/BlService";

const router = Router();
const bloService = new BlService();

router.get("/:lineId/:direction/busLineInfo", async (req, res) => {
    try
    {
        const rows = await bloService.getBusLineInfo(req.params.lineId, req.params.direction);        
        res.send(rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).end();
    }
});

export default router;
