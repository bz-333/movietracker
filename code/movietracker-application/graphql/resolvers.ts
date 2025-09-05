import { movieQueries } from "graphql/movies/queries";
import { movieMutations } from "graphql/movies/mutations";

export const resolvers = {
  Query: {
    ...movieQueries,
  },
  Mutation: {
    ...movieMutations,
  },
};
