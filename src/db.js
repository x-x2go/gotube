import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useMongoClient: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB (●'◡'●)");
const handleError = error => console.log(`Errir ib DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
