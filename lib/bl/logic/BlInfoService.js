import config from "config";
import lru from "lru-cache";

import { query } from "../../db/connection";

const busLineCache = lru({
    // 超时的item不会被立即移除，之后再次访问才会移除。也可以调用prune方法，立即删除过期的item
    maxAge: 1000 * 60 * 60,
    // 缓存100条线路信息
    max: 100,
    // 默认的length函数
    length: () => 1,
});

export default class BlInfoService {
    async getBusLineInfo(lineId, direction, language = "1") {
        const key = `${lineId}-${direction}-${language}`;
        if (!busLineCache.get(key)) {
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
            busLineCache.set(key, rows.map(row => [
                row.STOP_ID,
                row.STOP_NAME,
                [
                    row.LAT,
                    row.LNG,
                ],
            ]));
        }
        return busLineCache.get(key);
    }
}
