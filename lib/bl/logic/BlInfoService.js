import config from "config";

import { query } from "../../db/connection";

const busLines = new Map();

export default class BlInfoService {
    async getBusLineInfo(lineId, direction, language = "1") {
        const key = `${lineId}-${direction}-${language}`;
        if (!busLines.get(key) && busLines.get(key).expires < new Date().getTime()) {
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
            busLines.set(key, {
                expires: new Date().getTime() + 60 * 60 * 1000,
                value: rows.map(row => [
                    row.STOP_ID,
                    row.STOP_NAME,
                    [
                        row.LAT,
                        row.LNG,
                    ],
                ])
            });
        }
        return busLines.get(key).value;
    }
}

function toCsv(json) {
    json
}
