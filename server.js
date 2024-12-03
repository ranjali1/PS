const express = require("express");
const bodyParser = require("body-parser");
const LoginManager = require("./LoginManager");
const CompanyManager = require("./CompanyManager");
const SpotManager = require("./SpotManager");
const Account = require("./Account");
const Company = require("./Companies");
const AccountManager = require("./AccountManager");
const Spots = require("./Spots");
const SectionManager = require("./SectionManager");
const PlaceManager = require("./PlaceManager");

const Connection = require("./DB/Connection");

let db = new Connection();
db.testConnection();
 const multer = require("multer");
 const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("design")); // Serves files from the 'public' folder
//app.use('/design', express.static('design')); // Serve files from the 'design' folder

async function sp() {
  let place = new PlaceManager();
  const ps = await place.fetchCompany();
  for (let pls of ps)
  {
    console.log("id ", pls.p_id, "name ", pls.p_name);
  }
}
//sp();

// let spM = new SpotManager();
// spM.updateSpotStatus('1','1','1');
// Login endpoint

// let cmp = new Company("8", "dpTest232");
// let acc = new Account(
//   "diyar",
//   "diyar3@gmail.com",
//   "1234567",
//   "2",
//   cmp,
//   "1",
//   "077012222"
// );
// //console.log(acc.getCompany().getCompId());
// let accM = new AccountManager();
// //accM.addAccount(acc);


//adding spot
//let spotM = new SpotManager();
//spotM.addSpot(new Spots('2', 'a20', '1', 0, 0, 0, null, 'R'));

// let secM = new SectionManager();
// secM.addSection("1","1");



// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./design/images"); // Save to the "image" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Endpoint to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("uploading");
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filePath: `${req.file.filename}` });
  
  //res.json({ filePath: `./design/images/${req.file.filename}` });
});//end of upload file

app.get("/", async (req, res) => {
  console.log("aaa");
});
let clients = [];
app.get("/events", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);

  var data = "22";
  res.write(`data: ${JSON.stringify(data)}\n\n`);

  const sendUpdate = () => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // setInterval(sendUpdate, 5000);

  req.on("close", () => {
    res.end();
  });
});

app.post("/updateS", async (req, res) => {
  console.log("status progress");
  var data = "223";
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  res.json({ success: true });
});

app.post("/Create", async (req, res)=>{

  console.log("create");
  const {compName, email, password, phone, place, img} = req.body;

  let cmp = new Company("8", compName, place, img);
  let acc = new Account(
    compName,
    email,
    password,
    "3",
    cmp,
    phone,
  );
  //console.log(acc.getCompany().getCompId());
    let accM = new AccountManager();
    await accM.addAccount(acc);
    res.json({success: true});
});
app.post("/addSectoin", async (req, res)=>{
  console.log("addesction");
  const {spotName, compID} = req.body;
  let secM = new SectionManager();
 secM.addSection(compID,spotName);

  res.json({success: true, message: "done"});
});
app.post("/addSpot", async (req, res) => {
  const {spotName, selectedSide, secV, compID, lat, long} = req.body;
  let spotM = new SpotManager();
  let spotID = await spotM.addSpot(new Spots('2', spotName, compID, lat, long, 0, null, selectedSide, secV));

  res.json({success: true, message: spotID});
});


app.post("/", async (req, res) => {
  console.log("aaa2");
  const message = req.body.message;
  console.log("message:", message);
  res.json({ success: true, message: "Login successful" });

  let spot = new SpotManager();
  await spot.updateSpotStatus(message, 3, 1);

  console.log("status progressU");
  var data = "223U";
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const loginManager = new LoginManager();

  try {
    const isValid = await loginManager.doLogin(email, password);
    if (isValid.success) {
      res.json({ success: true, message: "Login successful", role: isValid.role, comp_id: isValid.comp_id});
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Sample data route in server.js
app.post("/section", async (req, res)=>{
  const {comp_id} =  req.body;
 // console.log("fetching spotN ", comp_id);
  console.log("fetching section data ", comp_id);
  let secM = new SectionManager();
  const secs = await secM.getSections(comp_id);
  console.log("Sections ", secs);
  res.json(secs);
})

app.get("/place", async (req, res) => {
  try {
    let place = new PlaceManager();
    const ps = await place.fetchCompany();
    // for (let pls of ps)
    // {
    //   console.log("id ", pls.p_id, "name ", pls.p_name);
    // }
    console.log("fetching place");
    res.json(ps); // Send the users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/company", async (req, res) => {
  try {
    console.log("fetching data");
    let company = new CompanyManager();
    // Replace this with your database query to get users
    const cmps = await company.fetchCompany(); //await db.select("*").from("users"); // Sample query
    res.json(cmps); // Send the users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/spot", async (req, res) => {
  try {
    const {comp_id} =  req.body;
    console.log("fetching spotN ", comp_id);
    let spot = new SpotManager();
    // Replace this with your database query to get users
    const cmps = await spot.getSpots(comp_id); //await db.select("*").from("users"); // Sample query
    console.log("befor: ", cmps);
    res.json(cmps); // Send the users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/dash", async (req, res) => {
  console.log("Fetching dash");
  //  let spot = [1,2,3,4,5,6,7,8,9,10];
  let company = new CompanyManager();
  // Replace this with your database query to get users
  const cmps = await company.fetchCompany(); //await db.select("*").from("users"); // Sample query

  res.json(cmps); // Send the users as JSON
});

//let company = new CompanyManager();
// Replace this with your database query to get users
//const cmps = company.fetchCompany();

// let spot = [1,2,3,4,5,6,7];
// spot.forEach(element => {
//     console.log("sp: ", element);

// });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
