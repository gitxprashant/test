dotenv.config();
import dotenv from 'dotenv';
import express from "express";
import userSchema from '../database/userModel.js';
import jwt from 'jsonwebtoken';

const app = express();
const secretKey = process.env.secretKey;

const login = app.post('/login', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(401).send("All fields are mandatory.");
    }

    try {
        // Check if the user exists in the database
        const existingUser = await userSchema.findOne({ email });

        if (!existingUser) {
            // User does not exist
            const loginTimestamp = new Date(); // Create login timestamp
            const newUser = new userSchema({
                name,
                email,
                phone,
                loginHistory: [{ timestamp: loginTimestamp }] // Initialize loginHistory with login timestamp
            });
            await newUser.save();

            // Generate JWT token
            const token = jwt.sign({ email }, secretKey, { expiresIn: '5m' });

            res.json({ token });
        } else {
            // User already exists
            if (existingUser.name === name) {
                // Generate JWT token
                const token = jwt.sign({ email }, secretKey, { expiresIn: '5m' });
                const loginTimestamp = new Date();
                existingUser.loginHistory.push({ timestamp: loginTimestamp });

                await existingUser.save();
                res.json({ token });
            } else {
                res.json({ error: "Email already exists with another Name" });
            }
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err });
    }
});

export default login;
  