const setOompas = (state = [], action) => {
  switch (action.type) {
    case 'setOompas':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default setOompas;
