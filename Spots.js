class Spots
{
    constructor(spot_id, spot_name, comp_id, lat, long, status, reserveC, side, secId)
    {
        this.spot_id = spot_id;
        this.spot_name = spot_name;
        this.comp_id = comp_id;
        this.lat = lat;
        this.long = long;
        this.status = status;
        this.reserveC = reserveC;
        this.side = side;
        this.secId = secId;
    }

    getSecId() { return this.secId; }
    
    setStatus(status)
    {
        this.status = status;
    }
    getSide() { return this.side; }

    getSpotID() { return this.spot_id; }
    getSpotName() { return this.spot_name; }
    getCompId() { return this.comp_id; }
    getLat() { return this.lat; }
    getLong() { return this.long; }
    getStatus() { return this.status; }
    getReserveC() { return this.reserveC; }
}

module.exports = Spots;