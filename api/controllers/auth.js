import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Info from "../models/Info.js";
import { createError } from "../utils/error.js";

export const register = async (req,res,next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin,
        })
        await newUser.save()
        res.status(200).json(newUser)

        const newInfo = new Info({
            username: req.body.username,
            email: req.body.email,
            event: `${req.body.username} is registered`,
        })
        await newInfo.save()
    } catch (err) {
        next(err)
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong username or password!"))

        const newInfo = new Info({
            username: user.username,
            email: user.email,
            event: `${user.username} is logged in`,
        })
        await newInfo.save()

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, email, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", 
            token, 
            {httpOnly: true,})
            .status(200).json({...otherDetails, isAdmin });
    } catch (err) {
        next(err)
    }
}
