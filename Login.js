const Connection = require('./DB/Connection');

class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async verify() {
        const conn = new Connection();
        const query = conn.knexPointer()
            .select("password","role_id","company_id")
            .from("user")
            .where("email", this.email);

        try {
            const [loginR] = await query;
            if (loginR && loginR.password === this.password) {
                return {success: true, role: loginR.role_id, comp_id: loginR.company_id};
            } 
            else {
                return {success:false};
            }
        } catch (error) {
            console.error("Error during verification:", error);
            return false;
        }
    }
}

module.exports = Login;
