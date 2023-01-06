import Post from "../models/Post.js";
import Info from "../models/Info.js";


export const createPost = async (req,res,next) => {
  try {
      const token = req.cookies.access_token;
      const newPost = new Post({
          username: req.user.username,
          title: req.body.title,
          desc: req.body.desc,
          tags: req.body.tags,
      })

      await newPost.save()
      res.status(200).send(newPost)

        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} created a post`,
        })
        await newInfo.save()

  } catch (err) {
      next(err)
  }
}

export const updatePost = async (req,res,next) => {
    try {
        const posts =  await Post.find({username: req.user.username},{id: req.params.id})
        if (posts.id = req.params.id) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
                {$set: req.body}, {new: true})
            res.status(200).json(updatedPost)
        } else {
            res.status(403).json("you are not allowed to update others post")
        }

        const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} updated a post of ID ${req.params.id}`,
        })
        await newInfo.save()

    } catch (err) {
        next(err);
    }
}

export const deletePost = async (req,res,next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Successfully")

        const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} deleted a post of ID ${req.params.id}`,
        })
        await newInfo.save()

    }catch (err) {
        next(err);
    }
}

export const getPost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);

      const token = req.cookies.access_token;
        const newInfo = new Info({
            username: req.user.username,
            email: req.user.email,
            event: `${req.user.username} views a post of ID ${req.params.id}`,
        })
        await newInfo.save()

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
