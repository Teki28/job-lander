import { User } from "@supabase/supabase-js";
import { createClient } from "./client"; 
import { Story, Post, Response } from "@/types_db";
import { createClient as createServerClient } from "./server";

export const selectStoryById = async (id: number) => {
  const supabase = createClient();
  let { data: story, error } = await supabase
  .from('story')
  .select('*')
  .eq("id", id);
  console.log(story)
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: story?.findLast
  } 
}

export const selectAllStroy = async (user: User) => {
  const supabase = createClient();
  let {data: stories, error} = await supabase
  .from('story')
  .select('*')
  .eq("user_id", user.id);

  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: stories
  } 
}

export const selectAllStroyServer = async () => {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser(); 
  if(user === null) {
    return {
      code: 0,
      data: "not log in"
    }
  }
  let {data: stories, error} = await supabase
  .from('story')
  .select('*')
  .eq("user_id", user.id);

  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: stories
  } 
}

export const insertStory = async (story: Story) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(user === null) {
    return {
      code: 0,
      data: "not log in"
    }
  }
  const {data: subscriptions, error: error2} = await supabase
  .from('subscriptions')
  .select('status')
  .eq("user_id", user.id);
  console.log("user id: " + user.id)
  console.log("isSub: " + subscriptions !== null ? subscriptions[0].status : "");
  console.log("error2: " + error2);

  const {data, error} = await supabase
  .from('story')
  .insert([
    {"user_id": story.user_id,
      "name": story.name,
    "isGroupWork": story.isGroupWork,
    "task_type": story.task_type,
    "goal": story.goal,
    "difficulty": story.difficulty,
    "action": story.action,
    "result": story.result}
  ])
  .select('*')
  console.log("error", error)
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: data
  } 
  
}

export const updateStoryById = async (story: Story) => {
  console.log("story id: " + story.id)
        
  const supabase = createClient();

  const {data: data, error} = await supabase
  .from('story')
  .update({
    isGroupWork: story.isGroupWork,
    task_type: story.task_type,
    goal: story.goal,
    difficulty: story.difficulty,
    action: story.action,
    result: story.result
  })
  .eq("id", story.id)
  .select();
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: data
  } 
}

export const deleteStoryById = async (id: number) => {
  const supabase = createClient();
  const {data: data, error} = await supabase.from('story')
  .delete().eq("id", id);
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: data
  } 
}

export const selectAllApplications = async (user: User) => {
  const supabase = createClient();
  const {error, data: applications} = await supabase.from("application").select('*').eq("user_id", user.id)
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: applications
  } 
}

export const selectAllApplicationsServer = async (user: User) => {
  const supabase = createServerClient();
  const {error, data: applications} = await supabase.from("application").select('*').eq("user_id", user.id)
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: applications
  } 
}

export const insertApplication = async (name: string, user: User) => {
  const supabase = createClient();
  const {data: applications, error} = await supabase.from("application").insert([{
    "user_id": user.id,
    "name": name
  }]).select('*')

  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: applications
  } 
}

export const deleteApplication = async (id: number) => {
  const supabase = createClient();
  const {error} = await supabase.from("application").delete().eq("id", id);
  if(error) return error.message;
  else return 'delete success'
}

export const selectPostById = async (id: string) => {
  const supabase = createClient();
  const {data: post, error} = await supabase.from("posts").select("*").eq("id", id);
  if(error) {
    return error.message
  }
  return post;
}

export const selectAllPosts = async (user: User) => {
  const supabase = createClient();
  const {data: posts, error} = await supabase.from("posts").select("*").eq("user_id", user.id);
  if(error) {
    return error
  }
  return posts;
}

export const selectPostsByApplication = async (id: number) => {
  const supabase = createClient();
  const {data: posts, error} = await supabase.from("posts").select("*").eq("application_id", id);
  if(error) {
    return error
  }
  return posts;
}

export const insertPost = async (post: Post) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
  .from('posts')
  .insert([
    { 
      "user_id": post.user_id ,
      "story_id": post.story_id,
      "theme": post.theme,
      "word_limit": post.word_limit,
      "job": post.job,
      "language": post.language
    }
  ])
  .select();

  if(error) return error.message
  else return 'insert success';
        
}

export const insertResponse = async (response: Response) => {
  const supabase = createClient();
  const {data, error} = await supabase.from("response").insert([
    {
      "application_id": response.application_id,
      "content": response.content,
      "model": response.model,
      "rate": response.rate,
      "job_type": response.job_type,
      "language": response.language,
      "question": response.question,
      "story_id": response.story_id, 
      "word_count": response.word_count
    }
  ])
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: data
  } 
}

export const updateResponse = async (response: Response) => {
  const supabase = createClient();
  const {data, error} = await supabase.from("response").update(
    {
      "application_id": response.application_id,
      "content": response.content,
      "model": response.model,
      "post_id": "",
      "rate": response.rate
    }
  ).eq("id", response.id)

  if(error) return error.message
  else return 'update success';
}

export const selectResponseById = async (id: number) => {
  const supabase = createClient();
  const {data: response, error} = await supabase.from("response").select("*").eq("id", id);
  if(error) {
    return error.message
  }
  return response;
}

export const selectResponseByApplicationId = async (application_id: number) => {
  const supabase = createClient();
  const {data: responses, error} = await supabase.from("response").select("*").eq("application_id", application_id);
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: responses
  } 
}

export const deleteResponseById = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase
  .from('response')
  .delete()
  .eq('id', id)
  if(error){
    return {
      code: 0,
      data: error.message
    }
  }
  return {
    code: 1,
    data: "deleted successfully id:" + id
  } 
        
}

 



