import { Types } from "mongoose";
import { updateWatchlist } from "mongoose/movies/services";

interface UpdateWatchlistInterface {
  user_id: string;
  movie_id: string;
}
export const movieMutations = {
  removeWatchlist: async (
    _: any,
    param: UpdateWatchlistInterface,
    context: {}
  ) => {
    return await updateWatchlist(
      new Types.ObjectId(param.movie_id),
      param.user_id,
      "remove"
    );
  },
  addWatchlist: async (
    _: any,
    param: UpdateWatchlistInterface,
    context: {}
  ) => {
    return await updateWatchlist(
      new Types.ObjectId(param.movie_id),
      param.user_id,
      "add"
    );
  },
};
