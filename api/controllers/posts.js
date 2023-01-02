import Post from "../models/Post.js";


export const createPost = async (req,res,next) => {
  try {
      const newPost = new Post({
          title: req.body.title,
          desc: req.body.desc,
          tags: req.body.tags,
      })

      await newPost.save()
      res.status(200).send("Post has been created!!!")
  } catch (err) {
      next(err)
  }
}

export const updatePost = async (req,res,next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, {new: true})
        res.status(200).json(updatedPost)
    } catch (err) {
        next(err);
    }
}

export const deletePost = async (req,res,next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Successfully")
    }catch (err) {
        next(err);
    }
}

export const getPost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };
  export const getPosts = async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };