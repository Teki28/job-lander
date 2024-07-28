import { selectAllApplicationsServer } from "@/utils/supabase/action";
import { ResponseWrapper, Story } from "@/types_db";
import { useStore } from "@/components/store";
import { observer } from "mobx-react-lite";
import { createClient } from "@/utils/supabase/server";
import ResponsePage from "@/components/ui/Application/ResponsePage";

export default async () => {
  // get all applications
  // get all responses and stories on this application
  // render card
  // init global status for modal box
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let applications;
  if(user) {
    const {code, data} = await selectAllApplicationsServer(user);
    if(code === 1) {
      applications = data;
    }
  }

  if(applications && typeof applications !== 'string') {
    applications.sort((a1, a2) => {
      return a1.id - a2.id;
    })
  }

  return (
    <div className="h-screen">

      {/* {code === 1 ?  
        data.map(story => (
          <StoryCard key={story.id} story={story}/>
        ))
       :
      <div>
        something wrong when fetching stories
      </div>} */}
      <ResponsePage applications={applications}/>

    </div>
  )
}


