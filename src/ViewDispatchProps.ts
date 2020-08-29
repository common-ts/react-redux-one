import {ReduxModel} from './ReduxModel';

export interface ViewDispatchProps<T, ID> {
  setGlobalState: (data: any) => void;
  load: (data: ReduxModel<any, T>) => void;
}
