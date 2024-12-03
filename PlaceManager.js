const Connection = require("./DB/Connection");

class PlaceManager
{


    async fetchCompany() {
        let conn = new Connection();
        const placeQuery = conn
          .knexPointer()
          .select("p_id", "p_name")
          .from("place");
        
        const palceR = await placeQuery;
      
        // for (let row of compR) {
        //   console.log("func ", row.company_id);
        // }
      
        return Array.isArray(palceR) ? palceR : [palceR];
        // return compR;
      }
}
module.exports = PlaceManager