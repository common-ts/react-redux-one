import {SearchModel, SearchResult} from 'search-utilities';

export interface ReduxSearchCallback<T, S extends SearchModel> {
  showResults: (obj: S, result: SearchResult<T>) => void;
  handleError: (response: any) => void;
}

export interface ReduxSearchModel<T, S extends SearchModel> {
  searchModel: S;
  callback: ReduxSearchCallback<T, S>;
}

export interface SearchDispatchProps<T, S extends SearchModel> {
  search?: (data: ReduxSearchModel<T, S>) => void;
}
