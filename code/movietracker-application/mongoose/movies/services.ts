import Movies from "mongoose/movies/model";
import { FilterWatchlistType, FilterMovieType } from "mongoose/movies/custom";
import { MovieType } from "mongoose/movies/schema";
import { ObjectId, QueryOptions } from "mongoose";

async function findMovies(
  filter: FilterMovieType | FilterWatchlistType | {}
): Promise<MovieType[] | []> {
  try {
    let result: Array<MovieType | undefined> = await Movies.find(filter);
    return result as MovieType[];
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function findAllMovies(): Promise<MovieType[] | []> {
  let filter = {};
  return await findMovies(filter);
}

export async function findMoviesById(
  movie_ids: ObjectId[]
): Promise<MovieType[] | []> {
  let filter = { _id: movie_ids };
  return await findMovies(filter);
}

export async function onUserWatchlist(
  user_id: string
): Promise<MovieType[] | []> {
  let filter: FilterWatchlistType = {
    on_watchlist: {
      $in: [user_id],
    },
  };
  return await findMovies(filter);
}

export async function updateWatchlist(
  movie_id: ObjectId,
  user_id: string,
  action: string
): Promise<MovieType | null | {}> {
  let filter = { _id: movie_id };
  let options: QueryOptions = { upsert: true, returnDocument: "after" };
  let update = {};

  switch (action) {
    case "add":
      update = { $push: { on_watchlist: user_id } };
      break;
    case "remove":
      update = { $pull: { on_watchlist: user_id } };
      break;
  }

  try {
    let result: MovieType | null = await Movies.findOneAndUpdate(
      filter,
      update,
      options
    );
    return result;
  } catch (err) {
    console.log(err);
  }
  return {};
}
