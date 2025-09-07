import Head from "next/head";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  PreviewData,
  NextPage,
} from "next";

import MovieDetail from "components/movie-details";
import dbConnect from "middleware/db-connect";
import { findMoviesById } from "mongoose/movies/services";

import { MovieType } from "mongoose/movies/schema";
import { ParsedUrlQuery } from "querystring";
import { Types } from "mongoose";

const Movie: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  let movie: MovieType = JSON.parse(props.data?.movie);
  let title = `The Movie Tracker - Details for ${movie?.name}`;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`The Movie Tracker. Detail page for ${movie?.title}`}
        />
      </Head>

      <h1>{movie?.title as string}</h1>
      <MovieDetail movie={movie} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  let movies: MovieType[] | [];
  let { movieId } = context.query;
  try {
    await dbConnect();
    movies = await findMoviesById([new Types.ObjectId(movieId as string)]);
    if (!movies.length) {
      throw new Error(`Movies ${movieId} not found`);
    }
  } catch (err: any) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: { movie: JSON.stringify(movies.pop()) } },
  };
};

export default Movie;
