"use client"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react";
import { useStore } from "@/components/store";
import { User } from "@supabase/supabase-js";
import { insertApplication, insertStory, updateStoryById, selectStoryById, insertResponse } from "@/utils/supabase/action";
import { ResponseWrapper, Story } from "@/types_db";

const SaveAnswerModal = () => {
  const store = useStore();
  const user = store.userStore.user;
  const [storyName, setStoryName] = useState('');
  const [appName, setAppName] = useState('');
  console.log(store.responseStore.application)
  useEffect(()=>{
    setAppName(store.responseStore.application.name);
  }, [store.responseStore.application])
  useEffect(()=>{
    setStoryName(store.storyStore.story ? store.storyStore.story.name : '');
  }, [store.storyStore.story])

  const saveResponse = async () => {
    // if store.story !== store.response.story_id, ask user to overwrite current story_id or create a new story
    if ( !user?.id ) {
      console.log("not login ")
      return
    }
    let res: ResponseWrapper = {
      code : 1,
      data: [store.storyStore.story]
    };
    if(store.storyStore.story.id === -1 || storyName !== store.storyStore.story.name) {
      store.storyStore.setName(storyName);
      res = await insertStory(store.storyStore.story);
    } else {
      const isSameStory = await compareStory(store.storyStore.story);
      if(!isSameStory) {
        res = await updateStoryById(store.storyStore.story);
      } 
    }
    if(res.code === 1) {
      const savedStory: Story = res.data[0];
      store.storyStore.setStory(savedStory);
      // then save this returned story to global context
    }
    if(store.responseStore.application.id === -1 || appName !== store.responseStore.application.name) {
       const res: ResponseWrapper = await insertApplication(appName, user);
       if(res.code === 1) {
        store.responseStore.setApplication(res.data[0]);
       }
    }
    store.responseStore.response.application_id = store.responseStore.application.id;
    store.responseStore.response.story_id = store.storyStore.story.id;

    const finalRes: ResponseWrapper = await insertResponse(store.responseStore.response);

    console.log("finalRes code: " + finalRes.code)
    console.log("finalRes data: " + finalRes.data)

  }
  
  const compareStory = async (story: Story): Promise<boolean> => {
    const res: ResponseWrapper = await selectStoryById(story.id);
    let persistedStory: Story|null = null;
    if(res.code === 1) {
      persistedStory = res.data;
    }
    if(persistedStory) {
      if(persistedStory.name === story.name && persistedStory.action === story.action && persistedStory.difficulty === story.difficulty && persistedStory.goal === story.goal && persistedStory.result == story.result) {
        return true
      }
      return false
    } else return false
  }
    // then if user chooses overwrite, update current story_id with content in ui
    // if user chooses create new story, create story and set store.response.story_id as newly created story_id
    // when user clicks askAI, store everything in store.response: 
    // application_id: number
    // job_type: number
    // language: number
    // model: number 
    // question: string
    // story_id: number 
    // word_count: number => update in real time when user modifies returned contents
    // content: string => update in real time when user modifies returned contents
  
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Save your answer to check later</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="columns-1">
        <input type="text" placeholder="what do you want to achieve" className="w-full input input-bordered mb-2" value={storyName} onChange={e=>setStoryName(e.target.value)}/>
        <input type="text" placeholder="application name" className="input input-bordered mb-4 w-full" value={appName} onChange={e=>setAppName(e.target.value)}/>
        <button className="btn btn-primary w-1/2" onClick={()=>saveResponse()}>Save Answer</button>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
export default observer(SaveAnswerModal)
