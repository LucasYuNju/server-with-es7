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

    const result = await tpiService.getIndexByTimeRange(new Date(from), new Date(to));
    res.send(result);
});

export default router;
