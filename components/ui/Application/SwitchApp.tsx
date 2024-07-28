"use client"
import { useStore } from "@/components/store"
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
const SwitchApp = ({applications}) => {
  const store = useStore();
  const router = useRouter();
  const switchApp = (app) => {
    store.responseStore.setApplication(app);
    router.refresh();
  }
  return (
    <div>
      {applications.map(app => {
        return (
          <button key={app.id} className={`btn ${store.responseStore.application.id === app.id ? 'btn-primary' : ''}`}
          onClick={() => switchApp(app)}>{app.name}</button>
        )
      })}
    </div>
  )
}

export default observer(SwitchApp)
