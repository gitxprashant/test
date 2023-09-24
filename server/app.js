dotenv.config();
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import dbCon from "./src/database/dbConnection.js";
import login from "./src/routes/login.js";
import getData from "./src/routes/getData.js";
import messages from "./src/routes/postMessages.js";
import logout from "./src/routes/logout.js";
const url = process.env.url;
dbCon(url);
const app = express();
app.use(cors());
app.use(express.json());

app.use(login);
app.use(getData);
app.use(messages);
app.use(logout);


app.listen(8001, () => {
    console.log("server is running at port 8001");
});