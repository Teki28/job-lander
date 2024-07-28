import { selectAllStroyServer } from "@/utils/supabase/action";
import { ResponseWrapper, Story } from "@/types_db";
import { useStore } from "@/components/store";
import { observer } from "mobx-react-lite";
import { createClient } from "@/utils/supabase/server";
import StoryCard from "@/components/ui/Story/StoryCard";
import StoryModal from "@/components/ui/Story/StoryModal";
export default async () => {
  const {code, data} = await selectAllStroyServer();
  if(typeof data !== 'string') {
    data?.sort((s1, s2) => {
      return s1.id - s2.id;
    })
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 m-10 overflow-auto">
      {code === 1 && typeof data !== 'string'?  
        data.map(story => (
          <StoryCard key={story.id} story={story}/>
        ))
       :
      <div>
        something wrong when fetching stories
      </div>}
      <StoryModal />
    </div>
  )
}


