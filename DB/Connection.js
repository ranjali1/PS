const knex = require("knex")({
  client: "mysql",
  connection: {
    port: "3306",
    host: "localhost",
    user: "root",
    password: "",
    database: "parking_db",
  },
});
class Connection {
  knexPointer() {
    return knex;
  }
  getConnection() {
    console.log("connected");
    //  const userQuery = knex
    //  .select('spot_id')
    //  .from('spots');

    //  Promise.all([userQuery])
    //  .then(async ([userResult]) => {
    //  {
    //     console.log("spot is ",userResult[0].spot_id);
    //  }
    //     } );
  }
}

module.exports = Connection;
