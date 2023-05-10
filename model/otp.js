const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
}, { timeStamps: true });

module.exports = mongoose.model("Otp", OtpSchema);