const express = require("express");
const router = express.Router();
const userSchema = require("../models/signup");
const authMiddleware=require("../middlewares/authMiddleware");
// const {login, user} =require("./validate");
const {user}=require("./validate");

router.post('/', async (req, res) => {
    const { name, address, dateOfBirth, gender, password } = req.body;
    const userCreated = new userSchema({
        name,
        address,
        dateOfBirth,
        gender,
        password
    });
    try {
        const newUser = await userCreated.save();
        res.status(201).json({message:"registration successful", token: await newUser.generateToken(), userId: newUser._id.toString()});
        // res.status(201).json(newUser);
    } catch (error) {
        console.log("error during signup: ", error);
        res.status(400).json({ message: error });
    }
});

router.put('/email', async (req, res) => {
    const { userId, email } = req.body;
    // console.log(userId);
    // console.log(email);
    try {
        const userExist = await userSchema.findByIdAndUpdate(userId, { email }, { new: true });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success:true, message:"ah"});
    } catch (error) {
        console.log("error in email verification section: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get('/email', async(req,res)=>{
    res.json({message:"alive"})
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userSchema.findOne({ email,password });
 
        if (!userExist) {
            return res.status(400).json({ error: "Invalid credentials", message: "Email doesn't exist" });
        }
        
        // const valUser=await userExist.comparePassword(password);
 
        if (userExist) {
            return res.status(200).json({
                success: true,
                message: "Password matched. Login successful.",
                token: await userExist.generateToken(),
                userId: userExist._id.toString() 
            });
        } else {
            return res.status(400).json({ error: "Invalid credentials", message: "Password doesn't match" });
        }
    } catch (error) {
        console.error("Login: ", error);
        return res.status(500).json({ error: "Internal server error", message: "Something went wrong on the server" });
    }
 });

router.get("/login", async(req,res)=>{
    res.json({message:"heelo, login"});
});

router.route("/user").get(authMiddleware,user);

module.exports = router;