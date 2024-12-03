const express = require("express");
const bodyParser = require("body-parser");
const LoginManager = require("./LoginManager");

const app = express();
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const loginManager = new LoginManager();

    try {
        const isValid = await loginManager.doLogin(email, password);
        if (isValid) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
