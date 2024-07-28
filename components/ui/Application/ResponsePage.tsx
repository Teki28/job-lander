"use client"
import { observer } from "mobx-react-lite";
import { useStore } from "@/components/store";
import { useEffect, useState } from "react";
import { selectResponseByApplicationId } from "@/utils/supabase/action";
import ResponseCard from "./ResponseCard";
import { useRouter } from "next/navigation";
const ResponsePage  = ({applications}) => {
  const [responses, setResponses] = useState([]);
  const router = useRouter();
  const store = useStore();
  const switchApp = (app) => {
    store.responseStore.setApplication(app);
    router.refresh();
  }
  useEffect(() => {
    selectResponseByApplicationId(store.responseStore.application.id).then(res => {
        if(res.code === 1 && typeof res.data !== "string") {
          setResponses(res.data);
        }
      });
    }, [])
  return (
    <div className="flex gap-8 ml-20 h-screen">
      <ul className="flex-none menu bg-base-200 rounded-box w-56 overflow-scroll">
        <li className="menu-title">My Applications</li>
      {applications.map(app => {
        return (
          <li key={app.id} className={`${store.responseStore.application.id === app.id ? 'bg-primary-content font-extrabold' : ''} active:text-red-500`}
          onClick={() => switchApp(app)}>
            <a>{app.name}</a>
          </li>
        )
      })}
    </ul>
      {/* <div>{responses.length > 0 ? responses[0]?.question : "aaaaaaa"}</div> */}
      <div className="flex-1 grid lg:grid-cols-2 gap-20 overflow-auto"> 
      {
        responses.length > 0 ? 
        responses.map(response => {
        console.log(response.question)
        return <ResponseCard key={response.id} response={response} />
      }) : 
      <div className="mt-10 font-mono text-xl subpixel-antialiased italic">
        No application selected or No records for this application
      </div>
    }
    </div>
    </div>
  )
}

export default observer(ResponsePage);
