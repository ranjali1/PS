require("./Companies");
class Account {
  constructor(fullName, email, password, roleid, company, phone_number) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.roleid = roleid;
    this.company = company;
    this.phone_number = phone_number;
  }
  
  getFullName() {
    return this.fullName;
  }
  getCompany() {
    return this.company;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getRoleId() {
    return this.roleid;
  }
  getPwd() {
    return this.password;
  }
  getPhoneNum() {
    return this.phone_number;
  }
}
module.exports = Account;
