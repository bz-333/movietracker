import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import MoviesList from "components/movies-list";
import dbConnect from "middleware/db-connect";
import { findAllMovies } from "mongoose/movies/services";

import { MovieType } from "mongoose/movies/schema";

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const movies: MovieType[] = JSON.parse(props.data?.movies);
  let title = `The Movie Tracker - Home`;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="The Movie Tracker - Home" />
      </Head>

      <h1>Welcome to the Movie Tracker!</h1>
      <MoviesList movies={movies} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let movies: MovieType[] | [];
  try {
    await dbConnect();
    movies = await findAllMovies();
  } catch (err: any) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: { movies: JSON.stringify(movies) },
    },
  };
};

export default Home;
