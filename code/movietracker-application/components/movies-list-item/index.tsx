import Link from "next/link";
import styles from "./index.module.css";
import { MovieType } from "mongoose/movies/schema";
import { JSX } from "react";
import { Types } from "mongoose";

interface PropsInterface {
  movie: MovieType;
}

const MoviesListItem = (props: PropsInterface): JSX.Element => {
  const movie: MovieType = props.movie;
  return (
    <>
      {movie && (
        <li className={styles.root}>
          <Link href={`/movie/${(movie._id as Types.ObjectId).toString()}`}>
            <h2>
              {movie.title as string}
              <small className={styles.details}>
                Released in {movie.year as number}
              </small>
            </h2>
          </Link>
        </li>
      )}
    </>
  );
};

export default MoviesListItem;
