import { IPageInfo } from "./../../graphql/requests";

// Описание принимаемых агрументов для элемента таблицы
export interface ITableItem {
  id: string;
  name: string;
  mainLang: string | null;
  updateTime: string;
  countForks: number;
  countStars: number;
}

// Описание елемента репозитория
export interface IRepositoryItem {
  id: string;
  name: string;
  mainLang: string | null;
  updateTime: string;
  countForks: number;
  countStars: number;
  license: string | null;
  languages: string[];
}

// массив репозиториев
export type RepositoriesData = IRepositoryItem[];

// Описывает состояние хранилища c репозиториями
export interface IRepositoriesState {
  data: RepositoriesData;
  loading: boolean;
  isError: boolean;
  error: string | undefined;
  isEmpty: boolean;
}

// Описывает состояние хранилища c настройками
export interface ISettingsState {
  countItemsPerPage: number;
  itemSearch: string;
  repositoryCount: number;
  pageInfo: IPageInfo;
  sort: string;
  paginationPage: number;
}

// Описывает состояние хранилища c выбранным репозиторием
export interface ISelectedReposState {
  selected: boolean;
  name: string;
  mainLang: string | null;
  countStars: number;
  languages: string[];
  license: string | null;
}
