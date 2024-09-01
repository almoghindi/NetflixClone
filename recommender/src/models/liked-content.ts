import mongoose from "mongoose";

// Define TypeScript interfaces
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
  contentType: "Movie" | "TvShow";
  contentData: MovieContent | TVShowContent;
}

interface LikedContentDoc extends mongoose.Document {
  userId: string;
  contentType: "Movie" | "TvShow";
  contentData: MovieContent | TVShowContent;
}

interface LikedContentModel extends mongoose.Model<LikedContentDoc> {
  build(attrs: LikedContentAttrs): LikedContentDoc;
}

// Define schemas
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

// LikedContent schema with discriminators
const LikedContentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      require: true,
      enum: ["Movie", "TvShow"],
    },
    contentData: {
      type: mongoose.Schema.Types.Mixed,
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

// Static method for building documents
LikedContentSchema.statics.build = (attrs: LikedContentAttrs) => {
  return new LikedContent(attrs);
};

// Create model with discriminators
const LikedContent = mongoose.model<LikedContentDoc, LikedContentModel>(
  "LikedContent",
  LikedContentSchema
);

export { LikedContent, MovieContent, TVShowContent };
