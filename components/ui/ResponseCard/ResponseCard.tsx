"use client"
import { useState, useEffect } from "react";
import { useStore } from "@/components/store";
import { observer } from "mobx-react-lite";
import { insertApplication, selectAllApplications } from "@/utils/supabase/action";
import { User } from "@supabase/supabase-js";
import { Application } from "@/types_db";
const ResponseCard = () => {
  const store = useStore();
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
            <textarea className="textarea textarea-primary textarea-lg w-full max-w h-2/3" value={store.responseStore.response?.content} onChange={e=>updateContent(e.target.value)} placeholder="Click Ask AI to get your answer here"></textarea>
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
