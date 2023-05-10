const { response } = require("express");
const User = require("../model/user");
const Otp = require("../model/otp");
const otpGenerator = require("otp-generator");
const authService = require("../service/auth_service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) => {
    console.log("In POST signup User ");
    try {
        const { name, email, password, number } = req.body;
        const userExists = await User.findOne({ number });
        if (userExists) {
            return res.status(400).send("User already registered");
        }
        const OTP = otpGenerator.generate(6, {
            number: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log(OTP);
        const otp = new Otp({ number: number, otp: OTP });
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt);
        const result = await otp.save();
        return res.status(200).send("Otp send successfully");
    } catch (error) {
        console.log("Error in user post ", error);
        res.status(400).send({ message: error.message });
    }
};

exports.login = async(req, res) => {
    console.log("In POST login User ");
    try {
        const { email, password: inputPassword } = req.body;
        console.log("In POST login User ", email, inputPassword);

        const token = await authService.login(email, inputPassword);

        res.status(200).send({ token: token });
    } catch (error) {
        console.log("error in user post ", error);
        res.status(400).send({ message: error.message });
    }
};

exports.logout = async(req, res) => {
    try {
        let loggedInUser = req.loggedInUser;

        await authService.logout(loggedInUser._id);
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in user post ", error);
        res.status(400).send({ message: error.message });
    }
};

exports.verifyToken = async(req, res, next) => {
    try {
        console.log("In verifyToken ", req.headers);
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            throw new Error({ message: "Access Denied. Please send Token" });

        const token = authHeader.split(" ")[1];
        if (!token)
            throw new Error({ message: "Access Denied. Please send Token" });
        console.log("token " + token);

        const user = await authService.verifyToken(token);
        req.loggedInUser = user;
        next();
    } catch (error) {
        console.log("error in user post ", error);
        res.status(400).send({ message: error.message });
    }
};

exports.verifyOtp = async(req, res) => {
    try {
        const { number, otp } = req.body;
        const otpHolder = await Otp.findOne({ number });
        if (!otpHolder) {
            return res.status(400).send("OTP not found");
        }
        const isOtpValid = await bcrypt.compare(otp, otpHolder.otp);
        if (!isOtpValid) {
            return res.status(400).send("Invalid OTP");
        }
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ number });
        if (userExists) {
            return res.status(400).send("User already registered");
        }

        const user = new User({ name, email, password, number });
        await user.save();
        await Otp.deleteOne({ number });
        return res.status(200).send("User registered successfully");
    } catch (error) {
        console.log("Error in verify OTP ", error);
        res.status(400).send({ message: error.message });
    }
};