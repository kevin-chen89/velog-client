import gql from 'graphql-tag';

export type Series = {
  id: string;
  url_slug: string;
  name: string;
  created_at: string;
};

export const GET_SERIES_LIST = gql`
  query GetSeriesList($username: String) {
    seriesList(username: $username) {
      id
      url_slug
      name
      created_at
    }
  }
`;

export type GetSeriesListResponse = {
  seriesList: Series[];
};

export const CREATE_SERIES = gql`
  mutation CreateSeries($name: String!, $url_slug: String!) {
    createSeries(name: $name, url_slug: $url_slug) {
      id
      name
      url_slug
      created_at
    }
  }
`;

export type CreateSeriesResponse = {
  createSeries: Series;
};

export const APPEND_TO_SERIES = gql`
  mutation AppendToSeries($series_id: ID!, $post_id: ID!) {
    appendToSeries(series_id: $series_id, post_id: $post_id)
  }
`;

export type AppendToSeriesResponse = {
  appendToSeries: number;
};

export const GET_SERIES = gql`
  query Series($username: String, $url_slug: String) {
    series(username: $username, url_slug: $url_slug) {
      id
      series_posts {
        id
        index
        post {
          id
          title
          thumbnail
          short_description
          url_slug
        }
      }
    }
  }
`;

// Generated by https://quicktype.io

export interface GetSeriesResponse {
  series: Series;
}

export interface SeriesDetail {
  id: string;
  series_posts: SeriesPostPreview[];
}

export interface SeriesPostPreview {
  id: string;
  post: {
    id: string;
    title: string;
    thumbnail: string;
    short_description: string;
    url_slug: string;
  };
}
