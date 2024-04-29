import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "You need to be logged in to access this route"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is invalid(say, someone hijacked our token), send an error response
        if(!decoded){
            return res.status(401).json({error: "Invalid token"})
        }

        // select("-password") is used to exclude the password from the user object
        // userId is the field in the token payload
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        // req.user will be available in the sendMessage controller
        // adds user object to the request object
        req.user = user;

        // Call the next middleware or (in this case) the sendMessage controller
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({ message: "Something went wrong...ded lmao" });
    }
};