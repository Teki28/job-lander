"use client"

import { observer } from "mobx-react-lite"
import { useState } from "react";
import { useStore } from "@/components/store";
import { User } from "@supabase/supabase-js";
import { insertApplication } from "@/utils/supabase/action";

const ApplicationModal = () => {
  const store = useStore();
  const user = store.userStore.user;
  const [appName, setAppName] = useState('');
  const createApplication = async (user: User | null, appName: string) => {
    if(user === null) {
      console.log("you must login to create your own application library!")
      return 
    }
    const res = await insertApplication(appName, user);
    store.responseStore.setApplication(appName);
    console.log(res);
  }
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create your application</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="flex flex-row flex-nowrap">
        <input type="text" placeholder="what do you want to achieve" className="basis-1/2 grow mr-2 input input-bordered w-full max-w-xs" value={appName} onChange={e=>setAppName(e.target.value)}/>
        <button className="btn basis-1/4 btn-primary" onClick={() => createApplication(user, appName)}>Create Application</button>
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
export default observer(ApplicationModal)
