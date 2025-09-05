export default `
  directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type Movie @cacheControl(maxAge: 86400) {
      title: String
      year: Int
      cast: [String]
      genres: [String]
      href: String
      extract: String
      thumbnail: String
      thumbnail_width: Int
      thumbnail_height: Int
      on_watchlist: [String] @cacheControl(maxAge: 60)
    }
`;
