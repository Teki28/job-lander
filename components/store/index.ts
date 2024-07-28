import { createContext, useContext } from "react";
import resLoadingStatus from "./resLoadingStore";
import responseStore from "./responseStore";
import userStore from "./userStore";
import storyStore from "./storyStore";


class RootStore {
  resLoadingStore;
  responseStore;
  userStore;
  storyStore;

  constructor() {
    this.resLoadingStore = resLoadingStatus;
    this.responseStore = responseStore;
    this.userStore = userStore;
    this.storyStore = storyStore;
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);
export {useStore};
