"use client"
import { chdir } from "process";
import { createContext, useState, useEffect } from "react";

const defaultChangeTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
}
export const ThemeContext = createContext({theme: "light", changeTheme: defaultChangeTheme});

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=> {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, [])

  if(!isMounted) {
    return <>Loading...</>
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
