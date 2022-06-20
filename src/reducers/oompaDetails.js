const oompasDetails = (state = [], action) => {
  switch (action.type) {
    case 'try':
      return [...state, 'test'];
    default:
      return state;
  }
};

export default oompasDetails;
