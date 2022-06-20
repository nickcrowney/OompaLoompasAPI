import { combineReducers } from 'redux';
import setPageId from './setPageId';
import setSearchTerm from './setSearchTerm';
import setOompas from './setOompas';
import setPageLoaded from './setPageLoaded';
import setTimer from './setTimer';

const allReducers = combineReducers({
  setPage: setPageId,
  setSearch: setSearchTerm,
  setOompas: setOompas,
  setPageLoaded: setPageLoaded,
  setTimer: setTimer,
  resetOompas: setOompas,
});

export default allReducers;
