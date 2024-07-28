import { makeAutoObservable } from "mobx";

class ResLoadingStore {

  isResLoading = false;

  constructor () {
    makeAutoObservable(this);
  }

  toggleResLoadingStatus = () => {
    this.isResLoading = !this.isResLoading;
  }
}

const resLoadingStatus = new ResLoadingStore();
export default resLoadingStatus;
