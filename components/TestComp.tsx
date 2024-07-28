'use client'
import { useContext, useState } from "react";
import { selectStoryById, insertStory, insertApplication } from "@/utils/supabase/action";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ThemeContext } from "@/app/context/ThemeContext";
import JobCard from "./ui/Job/JobCard";
import ResponseCard from "./ui/ResponseCard/ResponseCard";
import { useStore } from "./store";
import { User } from "@supabase/supabase-js";
import ApplicationModal from "./ui/ResponseCard/ApplicationModal";
import SaveAnswerModal from "./ui/ResponseCard/SaveAnswerModal";

export default function TestComp({user}: any) {
  const store = useStore();
  store.userStore.setUser(user);
  return (
    <div>
      <div className="flex">
        <JobCard />
        <div className="divider lg:divider-horizontal"></div> 
        <ResponseCard />    
      </div>
      <ApplicationModal />
      <SaveAnswerModal />
    </div>
  )
}
