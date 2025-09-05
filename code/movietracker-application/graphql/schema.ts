import gql from "graphql-tag";

import movieTypeDefsCustom from "graphql/movies/custom.gql";
import movieTypeDefsQueries from "graphql/movies/queries.gql";
import movieTypeDefsMutations from "graphql/movies/mutations.gql";

export const typeDefs = gql`

  ${movieTypeDefsCustom}

  type Query {
    ${movieTypeDefsQueries}
  }

  type Mutation {
    ${movieTypeDefsMutations}
  }

`;
