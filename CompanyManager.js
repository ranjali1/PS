const Connection = require("./DB/Connection");
const Companies = require("./Companies");

class CompanyManager {
  getCompanies() {
    let conn = new Connection();
    const compQuery = conn
      .knexPointer()
      .select("company_id", "company_name", "p_id", "image")
      .from("company");

    Promise.all([compQuery]).then(async ([compResult]) => {
      //console.log(compResult);

      // for (let compRows of compResult) {
      //   let cmps = new Companies(compRows.company_id, compRows.company_name);
      //   // console.log(
      //   //   `company id: ${cmps.getCompId()}, company name: ${cmps.getCompName()}`
      //   // );
      // }
    });
  }

  async addCompany(cmp) {
    let conn = new Connection();
    const newCmp = {
      company_name: cmp.getCompName(),
      p_id: cmp.getPlaceId(),
      image: cmp.getImg(),
    };
    let compId = 0;
    await conn
      .knexPointer()
      .insert(newCmp)
      .into("company")
      .then((result) => {
        console.log("company has been added successfully", result[0]);
        compId = result[0];
        return compId;
      })
      .catch((err) => {
        console.log("add company err ", err);
      });
    return compId;
  }
  async fetchCompany() {
    let conn = new Connection();
    const compQuery = conn
      .knexPointer()
      .select("company_id", "company_name", "p_id", "image")
      .from("company");
    
    const compR = await compQuery;

    // for (let row of compR) {
    //   console.log("func ", row.image);
    // }

    return Array.isArray(compR) ? compR : [compR];
    // return compR;
  }
}

module.exports = CompanyManager;

// let cmp = new CompanyManager();
// cmp.getCompanies(); tmp
