dotenv.config();
import express from "express";
import dotenv from 'dotenv';
import userSchema from "../database/userModel.js";
import authenticateToken from "../middleware/authenticate.js";

const app = express();

const getData = app.get('/get-data', authenticateToken, async (req, res) => {
    try {
        const userEmail = req.userEmail;
        // get the data of currently loggedin user
        const result = await userSchema.findOne({ email: userEmail});
        res.json(result);
    } catch (err) {
        console.log(err);
    }
});

export default getData;