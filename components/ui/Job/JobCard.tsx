"use client"
import { useEffect, useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useStore } from "@/components/store";
import { observer } from "mobx-react-lite";
import { ResponseWrapper, Story } from "@/types_db";
import { insertStory, selectAllStroy, updateStoryById } from "@/utils/supabase/action";
import { Response } from "@/types_db";
const JobCard = () => {
  const store = useStore();
  const user = store.userStore.user;
  const [goal, setGoal] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [question, setQuestion] = useState('');
  const [job, setJob] = useState('');
  const [res, setRes] = useState<any>('');
  const [stories, setStories] = useState([])
  const [storyName, setStoryName] = useState('');
  const [showExampleBtn, setShowExampleBtn] = useState("click to show example");
  useEffect(()=> {
    console.log("select story query executed")
    if(user === null) return
    selectAllStroy(user).then(
      res => {
        if (res.code === 1 && res.data !== null && typeof res.data !== "string") {
          setStories(res.data)
        }
        else {
          console.log("something wrong with getting stories")
        }
      }
    );
  }, [store.storyStore.story])

  const addStory = async () => {
    if ( !user?.id ) {
      console.log("not login ")
      return
    }
    const story: Story = {
      name: storyName,
      action: action,
      goal: goal,
      difficulty: difficulty,
      result: result,
      id: store.storyStore.story.id,
      created_at: '',
      user_id: user?.id,
      isGroupWork: true,
      task_type: 0
    }
    let res: ResponseWrapper;
    if(story.id !== -1 && storyName === store.storyStore.story.name) {
      console.log("updating story" + story.name)
      res = await updateStoryById(story);
    } else {
      res =  await insertStory(story);
    }
    
    if(res.code === 1) {
      const savedStory: Story = res.data[0];
      store.storyStore.setStory(savedStory);
      // then save this returned story to global context
    }
  }
  
  const toggleExample = () => {
    if (showExampleBtn === "click to show example") {
      setGoal("");
      setDifficulty("");
      setAction("");
      setResult("");
      setQuestion("");
      setShowExampleBtn("click to hide example");
    } else {
      setGoal("make a presentation");
      setDifficulty("team members are from different country, speak different language")
      setAction("use AI translator");
      setResult("made a good presentation, made friends with some members")
      setQuestion("Tell me some experience about teamwork")
      setShowExampleBtn("click to show example");
    }
  }

  const askAI = async () => {
      store.resLoadingStore.toggleResLoadingStatus();
      let prompt = "You are professionol HR to help students writing their job hunting resume. This student want to get a job as " + "software developer" + " , he is asked to provide an answer to question: " + question + ". Please help him write an answer. And answer should base on following experience: " + "He once joined a event which has goal to " + goal + " But, it was difficult because " + difficulty + " But he didn't give up, instead he " + action + " Finally, "+ result;
      // here, call next api using prompt as payload
      const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
        // ...
      })
      const data = await res.json();
      console.log("val : " + data["body"]);
      const response: Response = {
              application_id: 0,
              content: data["body"],
              created_at: '',
              id: -1,
              job_type: 0,
              language: 0,
              model: 0, 
              question: question,
              rate: -1,
              story_id: store.storyStore.story ? store.storyStore.story.id : -1, 
              word_count: data["body"].length
      }
      store.responseStore.setResponse(response);
      store.resLoadingStore.toggleResLoadingStatus();
    }
  
  const updateGoal = (goal: string) => {
    setGoal(goal);
    store.storyStore.setGoal(goal)
  }

  const updateDifficulty = (difficulty: string) => {
    setDifficulty(difficulty);
    store.storyStore.setDifficulty(difficulty);
  }

  const updateAction = (action: string) => {
    setAction(action);
    store.storyStore.setAction(action);
  }

  const updateResult = (result: string) => {
    setResult(result);
    store.storyStore.setResult(result);
  }

  const updateSelectedStory = (story: Story) => {
    if (!store.storyStore.story) {
      console.log("warn: this will overwrite your current unsaved story")
    }
    store.storyStore.setStory(story);
    setStoryName(story.name);
    setGoal(story.goal);
    setDifficulty(story.difficulty);
    setAction(story.action);
    setResult(story.result);
  }

  const resetStory = () => {
    store.storyStore.resetStory();
    setAction('');
    setDifficulty('');
    setGoal('');
    setResult('');
  }

  return (
    <div className="flex-1 ml-10 card border border-secondary shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Create Your Story {store.resLoadingStore.isResLoading}</h2>
        <div className="mb-6">Input your story and let AI use it !</div>
        <div className="flex flex-col lg:flex-row">
          <button className="btn btn-outline" onClick={toggleExample}>{showExampleBtn}</button>
          <div className="divider lg:divider-horizontal"></div>
          <button className="btn btn-outline" onClick={() => resetStory()}>reset story</button>
        </div>
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-outline m-1">My Stories</div>
          <ul tabIndex={0} className="block h-80 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow  overflow-auto">
            {stories.map((story, idx) => {
            return (
              <li key={idx} onClick={() => updateSelectedStory(story)}>
                <a>{story.name}</a>
              </li>
            )
          })}
          </ul>
        </div>
        <div className="font-bold">{store.storyStore.story?.name ? store.storyStore.story?.name : "New Story"}</div>

        <textarea placeholder="what do you want to achieve" className="textarea textarea-primary placeholder-grey-300 w-full" value={goal} onChange={e=>updateGoal(e.target.value)}/>
        <textarea placeholder="what's the biggest difficulty" className="textarea textarea-primary placeholder-grey-300 w-full" value={difficulty} onChange={e=>updateDifficulty(e.target.value)} />
        <textarea placeholder="what did you do to solve it" className="textarea textarea-primary placeholder-grey-300 w-full" value={action} onChange={e=>updateAction(e.target.value)}/>
        <textarea placeholder="what's the result" className="textarea textarea-primary placeholder-grey-300 w-full" value={result} onChange={e=>updateResult(e.target.value)} />
        <div>Define a question and let AI help you answer it </div>
        <input type="text" placeholder="question you want to answer" className="input input-bordered input-accent placeholder-grey-300 w-full max-w-96" value={question} onChange={e=>setQuestion(e.target.value)}/>
        <select defaultValue={"Job Type / Position"} className="select select-accent w-full max-w-96">
        <option disabled selected>Job Type / Position</option>
          <option>Software Engineer</option>
          <option>Mechanical Engineer</option>
          <option>Prodcut Manager</option>
          <option>Maktet</option>
          <option>Trader</option>
        </select>
        <div className="card-actions justify-end">
          <button className="btn" onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>Save Your Story</button>
          <button className="btn btn-primary" onClick={()=>askAI()}>Ask AI</button>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="flex flex-row flex-nowrap">
        <input type="text" placeholder="Give a name of your story" className="basis-1/2 grow mr-2 input input-bordered placeholder-grey-300 w-full max-w-xs" value={storyName} onChange={e=>setStoryName(e.target.value)}/>
        <button className="btn basis-1/4 btn-outline btn-primary" onClick={() => addStory()}>Create Story</button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
      </dialog>
    </div>
  )
}

export default observer(JobCard);
