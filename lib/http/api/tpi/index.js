import { Router } from "express";

import TpiService from "../../../tpi/logic/TpiService";

const router = Router();
const tpiService = new TpiService();

router.get("/", async (req, res) => {
    const from = parseInt(req.query.from);
    if (isNaN(from)) {
        res.status(400).send(`"from" time must be a UTC number`);
        return;
    }
    const to = parseInt(req.query.to);
    if (isNaN(to)) {
        res.status(400).send(`"to" time must be a UTC number`);
        return;
    }
    
    try
    {
        const result = await tpiService.getIndexByTimeRange(new Date(from), new Date(to));
        res.setHeader("Cache-Control", `public, max-age=${3600 * 24 * 365}`);
        res.send(result);
    }
    catch (e)
    {
        console.error(e);
        res.status(500).end();
    }
});

export default router;
