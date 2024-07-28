"use client"

import { Response } from "@/types_db";
import { deleteResponseById } from "@/utils/supabase/action";
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation";

const ResponseCard = ({response}) => {
  const router = useRouter();
  const removeResponse = async (id: number) => {
    const res = await deleteResponseById(id);
    if(res.code === 1) {
      console.log(res.data);
    } else {
      console.log(res.data)
    }
    router.refresh();
  }
  return (
    <div className="card glass w-96 h-96 overflow-scroll">


<div className="card-body">
  <div className="flex justify-end">
<div className="card-actions">
    <button className="btn btn-square btn-sm" onClick={() => removeResponse(response.id)}>
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

  <h2 className="card-title mb-4">{response.question}</h2>
  <div className="font-sans">
  <div className="border-b-2 border-gray-200 mb-2  hover:text-blue-500"><span className="font-semibold">Job Type: </span>{response.job_type}</div>
  <div className="border-b-2 border-gray-200 mb-2 hover:text-blue-500">
  <span className="font-semibold">Story: </span>{response.story_id}</div>
  <div className="border-b-2 border-gray-200 hover:text-blue-500"><span className="font-semibold">Answer: </span><br />{response.content} <br/> <div className="flex justify-between text-gray-400 text-sm mt-2"><span>word count: {response.word_count}</span> <span>{response.created_at.substring(0,10)}</span></div></div>
  </div>

</div>
    </div>
  )
}

export default observer(ResponseCard);
