export const setOompas = (value) => {
  return {
    type: 'setOompas',
    payload: value,
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

export const increment = () => {
  return {
    type: 'increment',
  };
};
