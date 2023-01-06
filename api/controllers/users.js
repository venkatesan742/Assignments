import Post from "../models/Post.js";
import User from "../models/User.js";
import Info from "../models/Info.js";

export const updateUser = async (req,res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)

        const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} updated a user details`,
        })
        await newInfo.save()


    } catch (err) {
        next(err);
    }
}
 
export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)

        const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} views a profile`,
        })
        await newInfo.save()

    } catch (err) {
        next(err);
    }
}

export const getUsers = async (req,res,next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted Successfully")

        const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} deleted a its account`,
        })
        await newInfo.save()

    }catch (err) {
        next(err);
    }
}

