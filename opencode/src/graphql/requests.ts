import { gql } from "@apollo/client";

interface Language {
  __typename: string;
  name: string;
}

interface LanguageEdge {
  __typename: string;
  node: Language;
}

interface LanguageConnection {
  __typename: string;
  edges: LanguageEdge[];
}

interface License {
  __typename: string;
  name: string;
}

interface User {
  __typename: string;
  login: string;
  url: string;
}

// Описывает полученый репозиторий
export interface Repository {
  __typename: string;
  id: string;
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
  licenseInfo: License;
  primaryLanguage: Language;
  languages: LanguageConnection;
  owner: User;
}

interface SearchResultItemEdge {
  __typename: string;
  node: Repository;
}

// Описывает информацию о странице из ответа с сервера
export interface IPageInfo {
  __typename: string;
  startCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  endCursor: string;
}

// Описывает поле поиска из ответа с сервера
export interface SearchResultDataSearch {
  search: {
    __typename: string;
    repositoryCount: number;
    pageInfo: IPageInfo;
    edges: SearchResultItemEdge[];
  };
}

// Описывает весь ответ с свервера
export interface SearchResultData {
  data: SearchResultDataSearch;
  loading: boolean;
  networkStatus: number;
}

export const GET_REPOSITIRIES = gql`
  query ($queryString: String!, $first: Int, $cursor: String) {
    search(
      query: $queryString
      type: REPOSITORY
      first: $first
      after: $cursor
    ) {
      repositoryCount
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            forkCount
            stargazerCount
            updatedAt
            licenseInfo {
              name
            }
            primaryLanguage {
              name
            }
            languages(first: 20) {
              edges {
                node {
                  name
                }
              }
            }
            owner {
              login
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITIRIES_PREV = gql`
  query ($queryString: String!, $first: Int, $cursor: String) {
    search(
      query: $queryString
      type: REPOSITORY
      last: $first
      before: $cursor
    ) {
      repositoryCount
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            forkCount
            stargazerCount
            updatedAt
            licenseInfo {
              name
            }
            primaryLanguage {
              name
            }
            languages(first: 20) {
              edges {
                node {
                  name
                }
              }
            }
            owner {
              login
              url
            }
          }
        }
      }
    }
  }
`;
