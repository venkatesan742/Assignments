import Info from "../models/Info.js";
// app.use(express.urlencoded({extended: true}))

export const getInfos = async (req, res, next) => {
    
    try {

      if (req.query.username) {
        const infos = await Info.find({username:req.query.username});
        res.status(200).json(infos)
    }else{
      const infos = await Info.find();
      res.status(200).json(infos);
    }
    } catch (err) {
      next(err);
    }
  };

  // export const postInfos = async (req, res, next) => {
  //   try {
  //     if (req.query.username) {
  //       const infos = await Info.find({username:req.query.username})
  //       res.status(200).json(infos)
  //     } else {
  //       const infos = await Info.find();
  //       res.status(200).json(infos)
  //     }
  //   } catch (error) {
  //     next(error)
  //   }
  // } 