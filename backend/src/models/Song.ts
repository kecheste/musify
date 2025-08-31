import { Schema, model, Document } from "mongoose";

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  year?: Number;
  durationSec?: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

const songSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    year: {
      type: Number,
      min: 1800,
      max: 2100,
    },
    durationSec: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

songSchema.index({ artist: 1, album: 1, title: 1 }, { unique: true });
songSchema.index({ title: "text", artist: "text", album: "text" });

const Song = model<ISong>("Song", songSchema);
export default Song;
