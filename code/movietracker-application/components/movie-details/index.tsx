import { MovieType } from "mongoose/movies/schema";
import styles from "./index.module.css";
import { JSX } from "react";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "components/button";
import { Types } from "mongoose";

interface PropsInterface {
  movie: MovieType;
}

interface WatchlistInterface {
  movieId: string;
  userId: string;
}

const MovieDetail = (props: PropsInterface): JSX.Element => {
  let movie = props.movie;

  const { data: session } = useSession();
  const [onWatchlist, setOnWatchlist] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    let userId = session?.user.fdlst_private_userId;
    setOnWatchlist(
      userId && (movie.on_watchlist as string[]).includes(userId) ? true : false
    );
  }, [session]);

  const watchlistAction = (props: WatchlistInterface) => {
    const { movieId, userId } = props;

    if (loading) {
      return false;
    }
    setLoading(true);

    let action = !onWatchlist ? "addWatchlist" : "removeWatchlist";

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation watchlist {
          ${action}(
            movie_id: "${movieId}",
            user_id: "${userId}"
          ) {
            on_watchlist
          }
        }`,
      }),
    })
      .then((result) => {
        if (result.status === 200) {
          setOnWatchlist(action === "addWatchlist" ? true : false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {movie && (
        <ul className={styles.root}>
          <li>
            <b>Cast: </b>
            {(movie.cast as string[]).join(", ")}
          </li>
          <li>
            <b>Genres: </b>
            {(movie.genres as string[]).join(", ")}
          </li>
          {(movie.extract as string) && (
            <li>
              <b>Extract: </b>
              {movie.extract as string}
            </li>
          )}
        </ul>
      )}

      {session?.user.fdlst_private_userId && (
        <Button
          variant={!onWatchlist ? "outline" : "blue"}
          disabled={loading ? true : false}
          clickHandler={() =>
            watchlistAction({
              movieId: (movie._id as Types.ObjectId).toString(),
              userId: session?.user?.fdlst_private_userId,
            })
          }
        >
          {onWatchlist && <>Remove from your Watchlist</>}
          {!onWatchlist && <>Add to your Watchlist</>}
        </Button>
      )}
    </div>
  );
};

export default MovieDetail;
