"use client"
import { observer } from "mobx-react-lite";
import { useStore } from "@/components/store";
import { useState } from "react";
import { Story } from "@/types_db";
import { updateStoryById } from "@/utils/supabase/action";
import { useRouter } from "next/navigation";
const StoryModal = () => {
  const store = useStore();
  const router = useRouter()
  const updateStory = async () => {
    const res = await updateStoryById(store.storyStore.story);
    console.log("updating story, ", res.code);
    console.log(res.data);
    router.refresh();
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box columns-1 justify-center">
        <h3 className="font-bold text-lg my-4 text-center">{store.storyStore.story.name}</h3>
        <div className="flex flex-col gap-2 justify-center align-middle">
        <label className="mx-auto form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What's the goal of this story</span>
  </div>
  <input type="text" placeholder="what do you want to achieve" className="mx-auto input input-bordered placeholder-red-300 w-full max-w-xs" value={store.storyStore.story.goal} onChange={e=>store.storyStore.setGoal(e.target.value)}/>
</label>
<label className="mx-auto form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What difficulty did you face</span>
  </div>
        <input type="text" placeholder="what do you want to achieve" className="mx-auto input input-bordered placeholder-red-300 w-full max-w-xs" value={store.storyStore.story.difficulty} onChange={e=>store.storyStore.setDifficulty(e.target.value)}/>
        </label>
        <label className="mx-auto form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What action did you take?</span>
  </div>
        <input type="text" placeholder="what do you want to achieve" className="mx-auto input input-bordered placeholder-red-300 w-full max-w-xs" value={store.storyStore.story.action} onChange={e=>store.storyStore.setAction(e.target.value)}/>
        </label>
        <label className="mx-auto form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What's result of this story</span>
  </div>
        <input type="text" placeholder="what do you want to achieve" className="mx-auto input input-bordered placeholder-red-300 w-full max-w-xs" value={store.storyStore.story.result} onChange={e=>store.storyStore.setResult(e.target.value)}/>
        </label>
        <button className="mt-4 btn btn-primary max-w-xs mx-auto" onClick={() => updateStory()}>Update</button>
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

export default observer(StoryModal);
