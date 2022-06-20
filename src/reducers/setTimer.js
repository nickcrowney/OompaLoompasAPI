const setTimer = (state = Date.now(), action) => {
  switch (action.type) {
    case 'setTimer':
      return Date.now();
    default:
      return state;
  }
};

export default setTimer;
