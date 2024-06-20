import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, Credential: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/test", (req, res, next) => {
  res.send("it works");
});

app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("server is running");
});
