class ReserveCol
{
    constructor(res_id, userId, spot_id, res_date, end_res_date)
    {
        this.res_id = res_id;
        this.userId = userId;
        this.spot_id = spot_id;
        this.res_date = res_date;
        this.end_res_date = end_res_date;
    }

    getResId() { return this.res_id; }
    getUserId() { return this.userId; }
    getSpotId() { return this.spot_id; }
    getResDate() { return this.res_date; }
    getEndRes() { return this.end_res_date;}
}

module.exports = ReserveCol;