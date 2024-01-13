import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save()
        res.status(201).json({ "message": "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email}); // instead wrinting {email : email}, after ES6 we can write like this as well
        if(!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Wrong credentials!"));
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRETE); // this line of code creates the json web token
        const {password : pass, ...rest} = validUser._doc; // sending password back to client is not good practice, so sending rest as response without password
        res.cookie("access_token", token, {httpOnly : true}).status(200).json(rest); // this is to sent the token as cookie to the browser
    } catch (error) {
        next(error);
    }
}