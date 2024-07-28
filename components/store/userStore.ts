import { User } from "@supabase/supabase-js";
import { makeAutoObservable } from "mobx";

class UserStore {

  user: User | null = null;

  constructor () {
    makeAutoObservable(this);
  }

  setUser = (user: User) => {
    this.user = user;
  }
}

const userStore = new UserStore();
export default userStore;
