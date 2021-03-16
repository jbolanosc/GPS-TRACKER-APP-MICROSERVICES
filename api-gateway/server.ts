import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/Routes";

const app: Application = express();
const port: unknown = process.env.PORT || 5000;

var whitelist = ["http://tracker-app:80", "http://localhost:7105"];

var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
//Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use(router);

app.listen(port, () => {
  console.log("Listening on port", port);
});
