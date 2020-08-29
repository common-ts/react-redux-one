import {DiffModel} from 'react-onex';
import {ReduxModel} from './ReduxModel';

enum Status {
  NotFound = 0,
  Success = 1,
  VersionError = 2,
  Error = 4,
}

export interface DiffApprDispatchProps<T, ID> {
  diff?: (data: ReduxModel<ID, DiffModel<T, ID>>) => void;
  approve?: (data: ReduxModel<ID, Status>) => any;
  reject?: (data: ReduxModel<ID, Status>) => any;
}
