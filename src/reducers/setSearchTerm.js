const setSearchTerm = (state = '', action) => {
  switch (action.type) {
    case 'setSearchTerm':
      return action.payload;
    default:
      return state;
  }
};

export default setSearchTerm;
