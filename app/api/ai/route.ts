import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { createClient } from "@/utils/supabase/server";
/* theme-controller */



const rateLimitMap = new Map();
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
});


// ip: ip identifier of user
// limit: number of access for current user 
// window: time window to refresh access numbers
const limitRate = (ip: string, limit: number, window: number) => {
  console.log("ip: " + ip)
  if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
          count: 0,
          lastReset: Date.now(),
      });
  }
  
  const ipData = rateLimitMap.get(ip);
  
  if (Date.now() - ipData.lastReset > window) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
  }

  console.log("count: " + ipData.count)
  console.log("limit: " + limit)
  
  if (ipData.count >= limit) {
    return false
  }

  ipData.count += 1;
  return true;
}


export async function POST(req: Request) {
  const supabase = createClient();
  const map = new Map(req.headers.entries())
  const ip = map.get("x-forwarded-host") || ""
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user)
  const limit = 5; // Limiting requests to 5 per minute per IP
  const windowMs = 60 * 1000; // 1 minute

  const isLimited: boolean = !limitRate(ip, limit, windowMs);
  
  if (isLimited) {
    return new Response(JSON.stringify({ hello: "to many responses" , body: "to many responses"}))
  }
  
  const reqData = await req.json();
  const res = await model.invoke([
    [
      "human",
      reqData["prompt"]
    ],
  ]);
  console.log(res.content.toString());
  return new Response(JSON.stringify({hello: "hello", body: res.content.toString()}))
}
