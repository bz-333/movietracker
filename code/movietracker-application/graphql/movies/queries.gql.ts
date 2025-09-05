export default `
  allMovies: [Movie]!
  moviesById(movie_ids: [String]!): [Movie]!
  onUserWatchlist(user_id: String!): [Movie]!
`;
