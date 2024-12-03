const SpotManager = require('./SpotManager'); // Import SpotManager from SpotManager.js
const Connection = require("./DB/Connection");
const Spots = require('./Spots');
const ReserveCol = require('./ReserveCol');


// let spots = new SpotManager("hello");
// console.log("spots:", spots.getName());

let conn = new Connection();
conn.getConnection();

// let recV = new ReserveCol(10,1,1,'10/12/2024', '10/13/2024');
// let spotD = new Spots(1,"s1", 1, 0.0, 0.0, 0, recV);
// console.log(spotD.getCompId());
// console.log(spotD.getReserveC().getResId());

let spotM = new SpotManager("ranj");

spotM.reserveSpot(3, 1, '2024-10-17 14:41:09', '2024-10-19 14:41:09');
let sps = spotM.getSpots();

// sps.forEach(element => {
//     console.log(element.getCompId());
//     console.log(element.getReserveC().getResId());

// });