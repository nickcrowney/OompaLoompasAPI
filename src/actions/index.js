export const setOompas = (value) => {
  return {
    type: 'setOompas',
    payload: value,
  };
};
export const resetOompas = () => {
  return {
    type: 'resetOompas',
  };
};

export const setPageId = () => {
  return {
    type: 'setPageId',
  };
};

export const setSearchTerm = (value) => {
  return {
    type: 'setSearchTerm',
    payload: value,
  };
};

export const setPageLoaded = (page) => {
  return {
    type: 'setPageLoaded',
    payload: page,
  };
};
export const setTimer = (page) => {
  return {
    type: 'setTimer',
    payload: page,
  };
};
