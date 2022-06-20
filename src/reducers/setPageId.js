const setPageId = (state = 2, action) => {
  switch (action.type) {
    case 'setPageId':
      return state + 1;
    default:
      return state;
  }
};

export default setPageId;
