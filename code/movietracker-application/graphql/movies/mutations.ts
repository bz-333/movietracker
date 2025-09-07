import { Types } from "mongoose";
import { updateWatchlist } from "mongoose/movies/services";
import { authGuard } from "@/middleware/auth-guard";
import { JWT } from "next-auth/jwt";

interface UpdateWatchlistInterface {
  user_id: string;
  movie_id: string;
}

interface contextInterface {
  token: JWT;
}

export const movieMutations = {
  removeWatchlist: async (
    _: any,
    param: UpdateWatchlistInterface,
    context: contextInterface
  ) => {
    const guard = authGuard(param, context);
    if (guard !== true) {
      return guard;
    }

    return await updateWatchlist(
      new Types.ObjectId(param.movie_id),
      param.user_id,
      "remove"
    );
  },

  addWatchlist: async (
    _: any,
    param: UpdateWatchlistInterface,
    context: contextInterface
  ) => {
    const guard = authGuard(param, context);
    if (guard !== true) {
      return guard;
    }

    return await updateWatchlist(
      new Types.ObjectId(param.movie_id),
      param.user_id,
      "add"
    );
  },
};
