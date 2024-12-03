const Login = require("./Login");

class LoginManager {
    async doLogin(email, password) {
        let lg = new Login(email, password);
        let r = await lg.verify();
        console.log("verify ", r);
        return {success: r.success, role: r.role, comp_id: r.comp_id}; // Return the result so it can be sent to the frontend
    }
}

module.exports = LoginManager;


// const Login = require("./Login");

// class LoginManager
// {
//     async doLogin()
//     {
//         let lg = new Login("test@gmail.com","123");
//         let r = await lg.verify();
//         console.log("verify ", await r);
//     }
// }

// let lgM = new LoginManager();
// let r = lgM.doLogin();
