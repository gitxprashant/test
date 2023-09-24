import express from 'express';
import authenticateToken from '../middleware/authenticate.js';
import userSchema from '../database/userModel.js';

const app = express();

const logout = app.post('/logout',  async (req, res) => {
  try {
    const userEmail = req.body.email;
    console.log(userEmail);
    // Find the user by email
    const user = await userSchema.findOne({ email: userEmail });

    if (user) {
      // Calculate session duration
      const logoutTimestamp = new Date();
      const lastLoginTimestamp = user.loginHistory[user.loginHistory.length - 1].timestamp;
      const sessionDurationInSeconds = Math.floor((logoutTimestamp - lastLoginTimestamp) / 1000);

      // Remove the token from local storage // This should be replaced with the actual code to remove the token from local storage

      // Save the session duration in the database
      user.loginHistory[user.loginHistory.length - 1].sessionDuration = sessionDurationInSeconds;
      await user.save();

      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default logout;
