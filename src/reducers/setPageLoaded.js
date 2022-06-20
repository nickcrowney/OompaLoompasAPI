const setPageLoaded = (state = [1], action) => {
  switch (action.type) {
    case 'setPageLoaded':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default setPageLoaded;
