import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

import dbConnect from "middleware/db-connect";
import { onUserWatchlist } from "mongoose/movies/services";
import { MovieType } from "mongoose/movies/schema";
import MoviesList from "components/movies-list";

import { useSession } from "next-auth/react";

const List: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const movies: MovieType[] = JSON.parse(props.data?.movies);
  const userId: string | undefined = props.data?.userId;
  const { data: session } = useSession();
  let title = `The Movie Tracker - A personal watchlist`;
  let isCurrentUsers = userId && session?.user.fdlst_private_userId === userId;
  return (
    <div>
      <Head>
        <title>{title}</title>
        content={`The Movie Tracker. A personal watchlist.`}
      </Head>
      <h1>
        {isCurrentUsers ? " Your " : " A "}
        watchlist!
      </h1>
      {isCurrentUsers && movies?.length === 0 && (
        <>
          <h2>Your list is currently empty! :(</h2>
          <p>Start adding movies to your watchlist!</p>
        </>
      )}
      <MoviesList movies={movies} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  let { userId } = context.query;
  let movies: MovieType[] | [] = [];
  try {
    await dbConnect();
    movies = await onUserWatchlist(userId as string);
  } catch (err: any) {}
  return {
    // the props will be received by the page component
    props: {
      data: { movies: JSON.stringify(movies), userId: userId },
    },
  };
};

export default List;
