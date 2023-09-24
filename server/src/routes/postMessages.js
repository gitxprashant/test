import express from 'express';
import authenticateToken from '../middleware/authenticate.js';
import userSchema from '../database/userModel.js';

const app = express();

const messages = app.post('/post-messages', authenticateToken, async (req, res) => {
    const message = req.body.message;
    if(!message){
        return res.send('Message Box is Empty');
    }
    try {
        const userEmail = req.userEmail;
        const result = await userSchema.findOneAndUpdate
        ({email: userEmail},{
            $push : {
                messages: message
            }
        })
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

export default messages;