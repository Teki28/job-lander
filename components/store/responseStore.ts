import { makeAutoObservable } from "mobx";
import { Response, Application } from "@/types_db";

class ResponseStore {

  response: Response = {
    application_id: -1,
    content: '',
    created_at: '',
    id: -1,
    job_type: -1,
    language: -1,
    model: -1, 
    question: '',
    rate: -1,
    story_id: -1,
    word_count: -1
  };
  application: Application = {
    created_at: '',
    id: -1,
    name: '',
    user_id: ''
  };

  constructor () {
    makeAutoObservable(this);
  }

  setResponse = (response: Response) => {
    this.response = response;
  }

  setApplication = (application: Application) => {
    this.application = application;
  }

  setAppName = (appName: string) => {
    this.application.name = appName;
  }

  setQuestion = (question: string) => {
    this.response.question = question
  }

  setContent = (content: string) => {
  this.response.content = content;
  }
}

const responseStore = new ResponseStore();
export default responseStore;
