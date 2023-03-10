import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);