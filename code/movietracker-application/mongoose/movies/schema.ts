import { Schema, InferSchemaType } from "mongoose";

export const MovieSchema: Schema = new Schema<MovieType>({
  title: {
    type: "String",
    required: true,
  },
  year: {
    type: "Number",
    required: true,
  },
  cast: {
    type: ["String"],
    required: true,
  },
  genres: {
    type: ["String"],
    required: true,
  },
  href: {
    type: "String",
    required: false,
  },
  extract: {
    type: "String",
    required: false,
  },
  thumbnail: {
    type: "String",
    required: false,
  },
  thumbnail_width: {
    type: "Number",
    required: false,
  },
  thumbnail_height: {
    type: "Number",
    required: false,
  },
  on_watchlist: {
    type: ["String"],
    required: true,
  },
});

export declare type MovieType = InferSchemaType<typeof MovieSchema>;
