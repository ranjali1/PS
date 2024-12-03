const Connection = require("./DB/Connection");
const Account = require("./Account");
const Company = require("./Companies");
const CompanyManager = require("./CompanyManager");
class AccountManager {
  async addAccount(account) {
    const company = account.getCompany();
    let conn = new Connection();

    let cmpManager = new CompanyManager();
    const cmpId = await cmpManager.addCompany(account.getCompany());

   // console.log("compid", cmpId);
    const newAccount = {
      fullName: account.getFullName(),
      email: account.getEmail(),
      password: account.getPwd(),
      role_id: account.getRoleId(),
      company_id: cmpId,
      phone_number: account.getPhoneNum(),
    };
    conn
      .knexPointer()
      .insert(newAccount)
      .into("user")
      .then(() => {
        console.log("Account has been created successfully");
      })
      .catch((err) => {
        console.log("Create Account err: ", err);
      });
  }
}

module.exports = AccountManager;
