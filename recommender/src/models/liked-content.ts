import mongoose from "mongoose";

interface MovieContent {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}
interface TVShowContent {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

interface LikedContentAttrs {
  userId: string;
  contentData: MovieContent;
}

interface LikedContentDoc extends mongoose.Document {
  userId: string;
  contentData: MovieContent;
}

interface LikedContentModel extends mongoose.Model<LikedContentDoc> {
  build(attrs: LikedContentAttrs): LikedContentDoc;
}
const MovieContentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String, required: true },
  genre_ids: { type: [Number], required: true },
  media_type: { type: String, required: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  title: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  name: { type: String, required: true },
});
const TVShowContentSchema = new mongoose.Schema({
  backdrop_path: { type: String, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  original_name: { type: String, required: true },
  overview: { type: String, required: true },
  poster_path: { type: String, required: true },
  media_type: { type: String, required: true },
  adult: { type: Boolean, required: true },
  original_language: { type: String, required: true },
  genre_ids: { type: [Number], required: true },
  popularity: { type: Number, required: true },
  first_air_date: { type: String, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  origin_country: { type: [String], required: true },
});

const LikedContentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contentData: {
      type: MovieContentSchema || TVShowContentSchema,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
LikedContentSchema.statics.build = (attrs: LikedContentAttrs) => {
  return new LikedContent(attrs);
};

const LikedContent = mongoose.model<LikedContentDoc, LikedContentModel>(
  "LikedContent",
  LikedContentSchema
);
export { LikedContent, MovieContent, TVShowContent };
