import mongoose, { model } from "mongoose";
import { MovieSchema, MovieType } from "mongoose/movies/schema";

export default mongoose.models.movies ||
  model<MovieType>("movies", MovieSchema);
