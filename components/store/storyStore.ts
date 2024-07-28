import { Story } from "@/types_db";
import { makeAutoObservable } from "mobx";

class StoryStore {

  story: Story  = {
    id: -1,
    name: '',
    created_at: '',
    user_id: '',
    isGroupWork: true,
    task_type: -1,
    goal: '',
    difficulty: '',
    action: '',
    result: ''
  };

  constructor () {
    makeAutoObservable(this);
  }

  setStory = (story: Story) => {
    this.story = story;
  }

  clearStory = () => {
    this.story = {
      id: -1,
      name: '',
      created_at: '',
      user_id: '',
      isGroupWork: true,
      task_type: -1,
      goal: '',
      difficulty: '',
      action: '',
      result: ''
    };
  }

  setGoal = (goal: string) => {
    if(this.story) {
      this.story.goal = goal;
    } else {
      console.log("story not exist")
    }
  }

  setDifficulty  = (difficulty: string) => {
    if(this.story) {
      this.story.difficulty = difficulty;
    } else {
      console.log("story not exist")
    }
  }

  setAction = (action: string) => {
    if(this.story) {
      this.story.action = action;
    } else {
      console.log("story not exist")
    }
  }

  setResult = (result: string) => {
    if(this.story) {
      this.story.result = result;
    } else {
      console.log("story not exist")
    }
  }

  setName = (name: string) => {
    if(this.story) {
      this.story.name = name;
    } else {
      console.log("story not exist")
    }
  }

  resetStory = () => {
    this.story = {
      id: -1,
      name: '',
      created_at: '',
      user_id: '',
      isGroupWork: true,
      task_type: -1,
      goal: '',
      difficulty: '',
      action: '',
      result: ''
    };
  }
}

const storyStore = new StoryStore();
export default storyStore;
