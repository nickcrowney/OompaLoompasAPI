const setOompas = (state = [], action) => {
  switch (action.type) {
    case 'setOompas':
      return [...state, ...action.payload];
    case 'resetOompas':
      return [];
    default:
      return state;
  }
};

export default setOompas;
