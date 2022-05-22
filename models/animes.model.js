import mongoose from "mongoose";

const AnimeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true, //esto funciona para quitar los espacios al inicio y final
    unique: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  lauching: {
    type: String,
    require: true,
    trim: true
  },
  image: {
    public_id: String,
    secure_url: String
  }
},{
  timestamps: true
})

export default mongoose.model("Anime", AnimeSchema);