import config from "config";

import { query } from "../../db/connection";

const busLines = new Map();

export default class BloService {
    async getBusLineInfo(lineId, direction, language = "1") {
        const key = joinKeys(lineId, direction, language);
        if (!busLines.get(key)) {
            const rows = await query(
                `select
                    lineStop."STOP_ID",
                    "STOP_NAME",
                    "LAT",
                    "LNG",
                    "SEQ_NO"
                from "SAP_ITRAFFIC_DEMO"."sap.traffic.demo.ptm.s.db::BUS.GIS_EXT.LINE_STOP" lineStop
                inner join "SAP_ITRAFFIC_DEMO"."sap.traffic.demo.ptm.s.db::BUS.GIS_EXT.STOP_NAME_T" stopName on
                    lineStop."STOP_ID"=stopName."STOP_ID"
                where "LINE_ID"=? and "DIRECTION"=? and "LANGU"=?
                order by "SEQ_NO"`,
                [
                    lineId,
                    direction,
                    language
                ]
            );
            busLines.set(key, rows.map(row => [
                row.STOP_ID,
                row.STOP_NAME,
                [
                    row.LAT,
                    row.LNG,
                ],
            ]));
        }
        return busLines.get(key);
    }
}

function joinKeys(...args) {
    return args.reduce((cur, arg) => cur + "-" + arg, "");
}
