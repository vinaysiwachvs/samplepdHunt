const User = require("../model/user");
const Otp = require("../model/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

exports.signup = async(name, email, password, number, otp) => {
    console.log("In Auth SignUp  ");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const existingNumber = await User.findOne({ number });
    if (existingNumber) {
        throw new Error("User with this number already exists");
    }

    const otpHolder = await Otp.findOne({ number });
    if (!otpHolder) {
        throw new Error("OTP not generated for this number");
    }

    const isMatch = await bcrypt.compare(otp, otpHolder.otp);
    if (!isMatch) {
        throw new Error("Invalid OTP");
    }

    const user = new User({ name, email, password, number });
    await user.save();

    return user._id;
};

exports.login = async(email, inputPassword) => {
    console.log("In Auth login  ");

    const user = await User.findOne({ email });
    console.log("user " + user);
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id, name: user.name },
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }
    );
    console.log("token " + token);

    await User.findOneAndUpdate({ _id: user._id }, { token: token });

    return token;
};

exports.logout = async(id) => {
    console.log("In Auth logout ");
    const user = await User.findOne({ _id: id });
    user.token = null;
    await User.findOneAndUpdate({ _id: user._id }, { token: "" });
};

exports.verifyToken = async(token) => {
    console.log("In Auth verifyToken ");
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: payload._id });
    if (!user) {
        throw new Error("User not found");
    } else if (!user.token) {
        throw new Error("Access Denied. please login");
    }

    console.log("payload " + payload);
    return user;
};

exports.verify = async(number, otp) => {
    console.log("In Auth Verify OTP ");
    const otpData = await Otp.findOne({ number });
    if (!otpData) {
        throw new Error("OTP not found");
    }

    const isMatch = await bcrypt.compare(otp, otpData.otp);
    if (!isMatch) {
        throw new Error("Invalid OTP");
    }

    await User.updateOne({ number }, { isVerified: true });
    await Otp.deleteOne({ number });
};