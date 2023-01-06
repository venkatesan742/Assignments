import mongoose from "mongoose";
const InfoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: false,
      },
    event: {
        type: String,
        required: true,
      },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Info", InfoSchema);