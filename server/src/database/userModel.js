import mongoose from "mongoose";

const User = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    messages: [{ type: String }],
    loginHistory: [{
        timestamp: { type: Date, default: Date.now },
        sessionDuration: { type: Number }
    }]
}, {
    timestamps: true
});

const userSchema = mongoose.model('User', User);

export default userSchema;
