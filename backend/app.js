import express from "express";
import cors from "cors";
import registerAPI from "./src/register.api.js";
import loginAPI from "./src/login.api.js";
import applicationAPI from "./src/application.api.js";
import uploadAPI from "./src/upload.api.js";
import "dotenv/config";
import staffLoginAPI from "./src/staff.login.api.js";
import staffRegisterApi from "./src/staff.register.api.js";
import staffApplicationsAPI from "./src/staff.applications.api.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "RailConnect Backend is Working",
  });
});

app.use("/api/auth", registerAPI);
app.use("/api/auth",loginAPI);
app.use("/api/applications", applicationAPI);
app.use("/api/upload", uploadAPI);
app.use("/api/staff", staffLoginAPI);
app.use("/api/staff", staffRegisterApi);
app.use("/api/staff", staffApplicationsAPI);

export default app;