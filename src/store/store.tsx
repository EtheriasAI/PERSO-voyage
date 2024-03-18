import Article from "../page/Article";

let store: Article[] = [];

const setData = (data: Article[]) => {
  store = data;
};

const getData = () => {
  return store;
};

export { setData, getData };