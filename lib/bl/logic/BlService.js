import config from "config";

import { query } from "../../db/connection";

export default class BloService {
    async getBusLineInfo(lineId, direction, language = "1") {
        console.log(config.get("http.port"));
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
        return rows;
    }
}
