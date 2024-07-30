"use client"
import { useState, useEffect } from "react";
import { useStore } from "@/components/store";
import { observer } from "mobx-react-lite";
import { insertApplication, selectAllApplications } from "@/utils/supabase/action";
import { User } from "@supabase/supabase-js";
import { Application } from "@/types_db";
const ResponseCard = () => {
  const store = useStore();
  const [isCopied, setIsCopied] = useState(false);
  const user = store.userStore.user;
  const [applications, setApplications] = useState([]);
  useEffect(()=> {
    console.log("select application query executed")
    if(user === null) return
    selectAllApplications(user).then(
      res => {
        if (res.code === 1 && res.data !== null && typeof res.data !== "string") {
          setApplications(res.data)
        }
        else {
          console.log("something wrong with getting stories")
        }
      }
    );
  }, [store.responseStore.application])

  const updateContent = (content: string) => {
    store.responseStore.setContent(content);
    store.responseStore.response.word_count = content.length;
  }

  const updateApplication = (application: Application) => {
    store.responseStore.setApplication(application);
    store.responseStore.response.application_id = application.id;
  }

  const copyCurrentAnswer = () => {
    navigator.clipboard.writeText(store.responseStore.response.content);
    setIsCopied(!isCopied);
  }


  return (
      <div className="flex-1 card border border-secondary shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{store.resLoadingStore.isResLoading ? 'Loading......' :'Click Ask AI to get your answer !'}</h2>
          <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-outline m-1">My applications</div>
          <ul tabIndex={0} className="block h-80 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow  overflow-auto">
          {applications.map((app, idx) => {
            return (
              <li key={idx} onClick={e => updateApplication(applications[idx])}>
                <div className="text-gray-600">{app.name}</div>
              </li>
            )
          })}
          </ul>
        </div>
          <div>{store.responseStore.application.name}</div>
          <div className="w-full max-w h-2/3">
          <div className="tooltip absolute mt-2 right-10 " data-tip="copy">
            {isCopied ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>copyCurrentAnswer()}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 :           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>copyCurrentAnswer()}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>}

          </div>

<textarea className="pt-6 textarea textarea-primary textarea-lg w-full max-w h-full" value={store.responseStore.response?.content} onChange={e=>updateContent(e.target.value)} placeholder="Click Ask AI to get your answer here"></textarea>
          </div>



          <div className="card-actions justify-end">
            <button className="btn" onClick={()=>(document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}>create application</button>
            <button className="btn btn-primary" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>Save Answer</button>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
        </div>
      </div>

  )
}

export default observer(ResponseCard);
