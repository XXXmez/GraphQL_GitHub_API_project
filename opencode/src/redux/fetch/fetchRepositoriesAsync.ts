import { IPageInfo, Repository } from "./../../graphql/requests";
import { RepositoriesData } from "./../slice/typesRedux";
import {
  SearchResultData,
  SearchResultDataSearch,
} from "../../graphql/requests";
import { DocumentNode } from "graphql";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../..";

interface IFetchRepositoriesParams {
  query: DocumentNode;
  name: string;
  first: number;
  cursor?: string;
  sort?: string;
}

export const fetchRepositoriesAsync = createAsyncThunk(
  "repositories/fetchRepositoriesAsync",
  async (params: IFetchRepositoriesParams) => {
    try {
      const res: SearchResultData = await client.query({
        query: params.query,
        variables: {
          queryString: params.sort
            ? `${params.name} sort:${params.sort}`
            : params.name,
          first: params.first,
          cursor: params.cursor,
        },
      });

      const pageInfo: IPageInfo = res.data.search.pageInfo;
      const repositoryCount: number = res.data.search.repositoryCount;

      const data: SearchResultDataSearch = res.data;
      const searchResults: RepositoriesData = data.search.edges.map((edge) => {
        const node: Repository = edge.node;
        return {
          id: node.id,
          name: node.name,
          mainLang: node.primaryLanguage ? node.primaryLanguage.name : null,
          updateTime: node.updatedAt,
          countForks: node.forkCount,
          countStars: node.stargazerCount,
          languages: node.languages.edges.map((edge) => {
            return edge.node.name;
          }),
          license: node.licenseInfo ? node.licenseInfo.name : null,
        };
      });

      return {
        repositoryCount,
        data: searchResults,
        pageInfo,
      };
    } catch (err) {
      console.error(
        "Ошибка при выполнении запроса(fetchRepositoriesAsync):",
        err
      );
      throw err;
    }
  }
);
