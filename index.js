const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();
const connectDB = require("./database/connectionDB");
const AllRoutes = require("./routes/AllRoutes");
const userModel = require("./models/UserModel");

const mongoose = require("mongoose");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  connectDB();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

async function creatSuperAdmin() {
  try {
    const existingUser = await userModel.findOne({
      role: "SUPERADMIN",
    });

    if (!existingUser) {
      const mdp = "58217520";
      const mdpCrypted = await bcrypt.hash(mdp, Number(process.env.SALT));
      const newUser = new userModel({
        email: "chouroufarah@gmail.com",
        nom: "farah",
        prenom: "chourou",
        role: "SUPER_ADMIN",
        password: mdpCrypted,
      });

      await newUser.save();
      console.log("SuperAdmincreated");
    }
  } catch (error) {
    console.error(error);
  }
}
app.use("/", AllRoutes);
creatSuperAdmin();
