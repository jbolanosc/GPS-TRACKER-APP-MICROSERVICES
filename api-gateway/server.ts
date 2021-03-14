import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/Routes";

const app: Application = express();
const port: unknown = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use(router);

app.listen(port, () => {
  console.log("Listening on port", port);
});
