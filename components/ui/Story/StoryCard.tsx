"use client"
import { Story } from "@/types_db";
import { deleteStoryById } from "@/utils/supabase/action";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useStore } from "@/components/store";
const StoryCard = ({story}) => {
  const store = useStore();
  const router = useRouter();
  const removeStory = async (id: number) => {
      const res = await deleteStoryById(id);
      console.log("result code: ", res.code);
      console.log("result: ", res.data);
      router.refresh();
  }
  const showModal = () => {
    store.storyStore.setStory(story);
    (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
  }
  return (
    <div className="card glass w-80 h-96">

      <div className="card-body overflow-y-auto">
        <div className="flex justify-between">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>showModal()}fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 hover:bg-primary-content">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
<div className="card-actions">
          <button className="btn btn-square btn-sm" onClick={() => removeStory(story.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        </div>

        <h2 className="card-title mb-4">{story.name}</h2>
        <div className="font-sans">
        <div className="border-b-2 border-gray-200  hover:text-blue-500"><span className="font-semibold">goal: </span><br />{story.goal}</div>
        <div className="border-b-2 border-gray-200 hover:text-blue-500">
        <span className="font-semibold">difficulty: </span><br />{story.difficulty}</div>
        <div className="border-b-2 border-gray-200 hover:text-blue-500"><span className="font-semibold">action: </span><br />{story.action}</div>
        <div className="hover:text-blue-500"><span className="font-semibold">result: </span><br />{story.result}</div>
        </div>
      </div>
    </div>
  )
}

export default observer(StoryCard);
