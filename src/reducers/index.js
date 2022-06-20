import { combineReducers } from 'redux';
import setPageId from './setPageId';
import setSearchTerm from './setSearchTerm';
import setOompas from './setOompas';
import increment from './increment';

const allReducers = combineReducers({
  setPage: setPageId,
  setSearch: setSearchTerm,
  setOompas: setOompas,
  increment: increment,
});

export default allReducers;
