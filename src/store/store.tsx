let store: any[] = [];

const setData = (data: any[]) => {
  store = data;
};

const getData = () => {
  return store;
};

export { setData, getData };