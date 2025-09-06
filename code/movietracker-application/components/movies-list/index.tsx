import MoviesListItem from "components/movies-list-item";
import styles from "./index.module.css";
import { MovieType } from "mongoose/movies/schema";
import { Types } from "mongoose";
import { JSX } from "react";

interface PropsInterface {
  movies: MovieType[];
}

const MoviesList = (props: PropsInterface): JSX.Element => {
  return (
    <ul className={styles.root}>
      {props.movies.map((movie) => {
        return (
          <MoviesListItem
            movie={movie}
            key={(movie._id as Types.ObjectId).toString()}
          />
        );
      })}
    </ul>
  );
};
export default MoviesList;
