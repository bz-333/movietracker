import { SchemaTypes, Types } from "mongoose";
import {
  findAllMovies,
  findMoviesById,
  onUserWatchlist,
} from "mongoose/movies/services";

export const movieQueries = {
  allMovies: async (_: any) => {
    return await findAllMovies();
  },
  moviesById: async (_: any, param: { movie_ids: string[] }) => {
    return await findMoviesById(
      param.movie_ids.map((id) => {
        return new Types.ObjectId(id);
      })
    );
  },
  onUserWatchlist: async (_: any, param: { user_id: string }) => {
    return await onUserWatchlist(param.user_id);
  },
};
