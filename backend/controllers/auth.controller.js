import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match" });
        }

        const user = await User.findOne({ userName })

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            // generate and send JWT via a cookie
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                message: "User registered successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({ message: "Failed to register user" });
        }
    } catch (error) {
        console.log("Error nigga", error.message)
        res.status(500).json({ error: "Something went wrong...Chud gya guru" });
    }
};


export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({userName:username})
        
        const isCorrectPassword = await bcrypt.compare(password, user?.password || "")
        
        if(!user || !isCorrectPassword){
            return res.status(400).json({error: "Invalid credentials"})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            message: "Logged in",
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ error: "Something went wrong...Chud gya guru" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== 'development',
        });
        // res.cookie("jwt", "", {maxAge:0})

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ error: "Something went wrong...Chud gya guru" });

    }
};  // Logout the user
