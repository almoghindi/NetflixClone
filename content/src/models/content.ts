import mongoose from "mongoose";

const genres = [
  "Action",
  "Comedy",
  "Fantasy",
  "Detective",
  "Horror",
  "Animation",
];
const contentsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  imgTitle: { type: String, required: true },
  imgThumb: { type: String, required: true },
  imgVertical: { type: String, required: true },
  trailer: { type: String, required: true },
  movie: { type: String, required: true },
  duration: { type: String, required: true },
  year: { type: String, required: true },
  limit: { type: String, required: true },
  genre: { type: Object.values(genres), required: true },
  isSeries: { type: Boolean, required: true },
});

export default mongoose.model("content", contentsSchema);
