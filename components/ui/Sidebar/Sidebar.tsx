"use client"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import Link from "next/link";

const Sidebar = ({user}: any) => {

  const {theme} = useContext(ThemeContext);
  const [showSub, setShowSub] = useState(false);
  useEffect(()=> {
    // get subscription data
    // set showSub = true is user is not subscibing
    console.log("user",user)
    setShowSub(true);
  },[])

  return (
<div className= "drawer z-10">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="fixed p-1 drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="z-20 drawer-button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:size-10 hover:bg-gray-100 hover:rounded-md transition-all">
  <path fill-rule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
</svg>
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className={`${theme === 'dark' ? 'bg-primary' : 'bg-white'} menu  min-h-full w-70 shadow-xl shadow-blue-gray-900/5`}>
    <div
className={`${theme === 'dark' ? 'bg-primary' : 'bg-white'} max-w-[20rem] flex-col rounded-xl bg-clip-border p-4`} >
<div className="items-center gap-4 p-4 mb-2">
  <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="w-8 h-8" />
  <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    Hi {user ? user.id: ""}
  </h5>
</div>
<nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
<Link href="/" className="relative block w-full hover:bg-gray-100">
    <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <button type="button"
        className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 
        hover:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-5 h-5">
            <path fill-rule="evenodd"
              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
          Ask AI
        </p>
      </button>
    </div>
  </Link>
  <Link href="/story" className="relative block w-full hover:bg-gray-100">
    <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <button type="button"
        className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 
        hover:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-5 h-5">
            <path fill-rule="evenodd"
              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
          Story
        </p>
      </button>
    </div>
  </Link>
  <Link href="/application" className="relative block w-full hover:bg-gray-100">
    <div role="button"
      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <button type="button"
        className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-5 h-5">
            <path fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
          Application
        </p>
      </button>
    </div>
    {/* <div className="overflow-hidden">
      <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
        <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
          <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" aria-hidden="true" className="w-5 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
              </svg>
            </div>
            Orders
          </div>
          <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" aria-hidden="true" className="w-5 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
              </svg>
            </div>
            Products
          </div>
        </nav>
      </div>
    </div> */}
  </Link>
  <hr className="my-2 border-blue-gray-50" />

  <div role="button"
    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 hover:bg-gray-100">
    <div className="grid mr-4 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
        className="w-5 h-5">
        <path fill-rule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    Profile
  </div>
  <Link href="/subscribe" role="button"
    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 hover:bg-gray-100">
    <div className="grid mr-4 place-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-5 h-5">
            <path fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clip-rule="evenodd"></path>
          </svg>
    </div>
    Subscription
  </Link>
  <div role="button"
    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 hover:bg-gray-100">
    <div className="grid mr-4 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
        className="w-5 h-5">
        <path fill-rule="evenodd"
          d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    Log Out
  </div>
</nav>
<div role="alert"
  className= {`${showSub ? '' : 'invisible'} relative flex w-full px-4 py-4 mt-auto text-base text-white bg-gray-900 rounded-lg font-regular`}>
  <div className="mr-12">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      aria-hidden="true" className="w-12 h-12 mb-4">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25">
      </path>
    </svg>
    <h6
      className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
      Upgrade to PRO
    </h6>
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-inherit opacity-80">
      Upgrade to Material Tailwind PRO and get even more components,
      plugins, advanced features and premium.
    </p>
    <div className="flex gap-3 mt-4">
      <a href="#" onClick={()=>setShowSub(false)} className="block font-sans text-sm antialiased font-medium leading-normal text-inherit opacity-80">
        Dismiss
      </a>
      <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
        Upgrade Now
      </a>
    </div>
  </div>
  <button
  onClick={()=>setShowSub(false)}
    className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        className="w-6 h-6" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </span>
  </button>
</div>
</div>
    </ul>
  </div>
</div>
)}

  export default Sidebar;
