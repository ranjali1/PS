const knex = require("knex")({
  client: "mysql",
  connection: {
    port: "3306",
    host: "51.20.24.119",
    user: "admin",
    password: "Ranj07736993569",
    database: "parking_db",
  },
});
class Connection {
  knexPointer() {
    return knex;
  }
  async testConnection() {
    try {
      await knex.raw("SELECT 1"); // A simple query to check the connection
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
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
