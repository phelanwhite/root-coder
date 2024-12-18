import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comic: {
      type: String,
    },
    movie: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default bookmarkModel =
  mongoose.models.bookmark || mongoose.model(`bookmark`, bookmarkSchema);
