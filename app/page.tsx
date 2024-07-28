import { createClient } from "@/utils/supabase/server";
import TestComp from "@/components/TestComp";

export default async () => {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div>
      <TestComp user = {user}/>
    </div>

  )
}
