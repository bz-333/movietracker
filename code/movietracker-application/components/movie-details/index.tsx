import { MovieType } from "mongoose/movies/schema";
import styles from "./index.module.css";
import { JSX } from "react";

interface PropsInterface {
  movie: MovieType;
}

const MovieDetail = (props: PropsInterface): JSX.Element => {
  let movie = props.movie;
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
    </div>
  );
};

export default MovieDetail;
