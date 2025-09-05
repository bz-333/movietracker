import { Types } from "mongoose";

export declare type FilterMovieType = {
  _id: Types.ObjectId | { $in: Types.ObjectId[] };
};

export declare type FilterWatchlistType = {
  on_watchlist: {
    $in: string[];
  };
};
