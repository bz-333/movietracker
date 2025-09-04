import { ObjectId } from "mongoose";

export declare type FilterMovieType = {
  location_id: ObjectId | ObjectId[];
};

export declare type FilterWatchlistType = {
  on_watchlist: {
    $in: string[];
  };
};
