const increment = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
};

export default increment;
