import gql from 'graphql-tag';

const searchQuery = gql`
    query search(
      $numberOfIssues: Int,
      $genres: [String!],
      $writers: [String!],
      $publishers: [String!],
      $artists: [String!],
      $search: String
      ) {
      comics(
        numberOfIssues: $numberOfIssues,
        search: $search,
        genres: $genres,
        writers: $writers,
        publishers: $publishers,
        artists: $artists,
        limit: 20
        ) {
        _id
        title
      } 
    }
  `;

const genresQuery = gql`
    {
      genres(limit: 0) {
        id
        name
      }
    }
  `;

const genreQuery = gql`
  query genreQuery($id: ID!) {
    genre(id: $id) {
      name
    }
  }
`;

const writersQuery = gql`
    query searchWriter($search: String){
      writers(search: $search, limit: 20) {
        id
        first_name
        last_name
      }
    }
  `;

const writerQuery = gql`
  query writerQuery($id: ID!) {
    writer(id: $id) {
      first_name
      last_name
    }
  }
`;

const artistsQuery = gql`
    query searchArtist($search: String){
      artists(search: $search, limit: 20) {
        id
        first_name
        last_name
      }
    }
  `;

const artistQuery = gql`
  query artistQuery($id: ID!) {
    artist(id: $id) {
      first_name
      last_name
    }
  }
`;

const publishersQuery = gql`
    query searchPublisher($search: String){
      publishers(search: $search, limit: 20) {
        id
        name
      }
    }
  `;

const publisherQuery = gql`
  query publisherQuery($id: ID!) {
    publisher(id: $id) {
      name
    }
  }
`;

const queryFactory = (type) => {
  if (type === 'genres') {
    return genresQuery;
  }
  if (type === 'genre') {
    return genreQuery;
  }
  if (type === 'writers') {
    return writersQuery;
  }
  if (type === 'writer') {
    return writerQuery;
  }
  if (type === 'artists') {
    return artistsQuery;
  }
  if (type === 'artist') {
    return artistQuery;
  }
  if (type === 'publishers') {
    return publishersQuery;
  }
  if (type === 'publisher') {
    return publisherQuery;
  }
};

export {
  searchQuery,
  queryFactory
}