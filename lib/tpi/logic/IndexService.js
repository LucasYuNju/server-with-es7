export default class IndexService
{
    async getIndexByTime(time)
    {
        const minutes = time.getHours() * 60 + time.getMinutes();
        return await this._getIndexByMinutes(minutes);
    }

    async getIndexByTimeRange(from, to)
    {
        const result = [];
        const fromMinutes = from.getHours() * 60 + from.getMinutes();
        const toMinutes = to.getHours() * 60 + to.getMinutes();
        for (let i = fromMinutes; i <= toMintues; i++)
        {
            result.push(await _getIndexByMinutes(i));
        }
        return result;
    }
    
    async _getIndexByMinutes(minutes) {
        return Math.abs(Math.sin((minutes / 24 / 60) * 2 * Math.PI)) * 7;
    }
}
