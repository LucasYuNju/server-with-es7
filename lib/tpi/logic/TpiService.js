export default class TpiService
{
    /**
     * Client-side cache
     *  if-not-modified-since：服务器给一个last-modified时间，下一次客户端会把这个时间戳通过if-not-modified-since传给服务器
     *  e-tag: entity-tag，通常是hash, express自动会加etag
     *  max-age：静态文件名带hash后缀，避免304
     * 
     * Server-side cache
     *  In-memory cache
     *  Redis cache
     * 
     * Error handling
     */
    async getIndexByTime(time)
    {
        const minutes = time.getHours() * 60 + time.getMinutes();
        return await this._getIndexByMinutes(minutes);
    }

    async getIndexByTimeRange(from, to)
    {
        if (from > to) {
            throw new Error("From must be no greater than to");
        }
        const result = [];
        const fromMinutes = from.getHours() * 60 + from.getMinutes();
        const toMinutes = to.getHours() * 60 + to.getMinutes();
        for (let i = fromMinutes; i <= toMinutes; i++)
        {
            result.push(await this._getIndexByMinutes(i));
        }
        return result;
    }
    
    
    async _getIndexByMinutes(minutes) {
        return Math.abs(Math.sin((minutes / 24 / 60) * 2 * Math.PI)) * 7;
    }
}
