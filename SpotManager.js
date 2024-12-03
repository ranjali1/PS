const Spots = require("./Spots");
const ReserveCol = require('./ReserveCol');
const Connection = require('./DB/Connection');
class SpotManager {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    async updateSpotStatus(newStatus, spotId, cmpId)
    {
        let conn = new Connection();
        const newSpotStatus = {
            status: newStatus
        }

        try{
            await conn.knexPointer()
            .table('spots')
            .where({spot_id: spotId, company_id: cmpId})
            .update(newSpotStatus);
        }catch(err)
        {
            console.log("Update error:", err);
        }

    }
    reserveSpot(spot_id, user_id, resv_date, end_date)
    {
        //2024-10-14 14:41:09
        let conn = new Connection();
        const newResv = {
           spot_id: spot_id,
           userId: user_id,
           res_date: resv_date,
           end_res_date: end_date
        };

        conn.knexPointer()
            .insert(newResv)
            .into('reserve')
            .then(()=> {
                console.log("the spot reserved successfully");
            })
            .catch(err => {
                console.log("Reserving err: ", err)
            });
        
    }
    async addSpot(spots)
    {
        let spotID = 0;
        let conn = new Connection();
        const newspot = 
        { 
           // spot_id: spots.getSpotID(),
            spot_name: spots.getSpotName(),
            company_id: spots.getCompId(),
            status: spots.getStatus(),
            side: spots.getSide(),
            sec_id: spots.getSecId(),
            lattitude: spots.getLat(),
            longitude: spots.getLong()
        };

        await conn.knexPointer()
                .insert(newspot)
                .into('spots')
                .then((result)=>{
                    console.log("spot has been added successfully.");
                    spotID = result[0];
                    return spotID;
                })
                .catch(err => {
                    console.log("adding spot err: ", err);
                });
        return spotID;
    }
    async getSpots(comp_id)
    {
        // let spotD = new Spots(1,"s1", 1, 0.0, 0.0, 0, new ReserveCol(12,1,1,'12/12/2024', '10/13/2024'));
        // let spotD1 = new Spots(1,"s1", 1, 0.0, 0.0, 0, new ReserveCol(11,1,1,'11/12/2024', '10/13/2024'));
        // let spotD2 = new Spots(1,"s1", 1, 0.0, 0.0, 0, new ReserveCol(14,1,1,'12/12/2024', '10/13/2024'));
        // let spotD3 = new Spots(1,"s1", 1, 0.0, 0.0, 0, new ReserveCol(12,1,1,'14/12/2024', '10/13/2024'));
       // console.log("connected");
        let data = [];
        let hashMap = {};
        let conn = new Connection();
        const spotQuery = conn.knexPointer()
        .select('spot_id','spot_name', 'company_id', 'lattitude', 'longitude', 'status', 'side', 'sec_id')
        .from('spots')
        .where('spots.company_id', comp_id);

        const resvQ = conn.knexPointer()
        .select('res_id', 'userId', 'spot_id', 'res_date', 'end_res_date')
        .from('reserve');

        await Promise.all([spotQuery, resvQ])
        .then(async ([spotResult, resvR]) => {
            {
                for(let row of resvR)
                {
                    hashMap[row.spot_id] = row.spot_id;
                }

                // for(let resvKey in hashMap)
                // {
                //     console.log("data is ",hashMap[resvKey]);
                // }

                for(let spotsR of spotResult)
                {
                    let spots = new Spots(spotsR.spot_id, spotsR.spot_name, spotsR.company_id, 
                        spotsR.lattitude, spotsR.longitude, spotsR.status, null, spotsR.side, spotsR.sec_id
                     );
                     if(hashMap[spots.getSpotID()] != null) { spots.setStatus(1); }
                   //  console.log(`spot ID: ${spots.getSpotID()}, spot name ${spots.getSpotName()}, comp id ${spots.getCompId()}, status ${spots.getStatus()}`);
                     data.push(spots);
                    
                }
                
               // console.log("spots: ",spotResult);
                //console.log("resvs: ",resvR);
            }
        } );
        //let data = [spotD, spotD1, spotD2, spotD3];
        return data;
    }
}

module.exports = SpotManager;
