"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import RealData from '../components/realdata'
import CopyData from '../components/copydata';
import {
  ClipboardIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Home() {
  const [activeTab, setActiveTab] = useState("Real data");
  const [toastmsg, setToastMsg] = useState("")
  const [failtoastmsg, setFailToastMsg] = useState("")
  const [userdetails, setUserDetails] = useState([])
  const [creatinguser, setCreatingUser] = useState(false)

  const router = useRouter();

  const tabs = [
    {
      name: "Real data",
      icon: ClipboardIcon,
      current: true,
    },
    {
      name: "Copy data",
      icon: DocumentDuplicateIcon,
      current: false,
    },
  ];

  const tabContent = [
    {
      name: "Real data",
      content: <RealData data={activeTab} listdata={userdetails} />,
    },
    {
      name: "Copy data",
      content: <CopyData data={activeTab} />,
    }
  ];



  async function createuserdata() {
    setCreatingUser(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/user/create`,
        {
          method: "POST",

        }
      );
      const data = await response.json();
      if (response.ok && data) {
        setToastMsg("User created successfully")
        setTimeout(() => {
          setToastMsg("")
          setCreatingUser(false)
        }, [1000])
      } else if (!response.ok && data.message) {
        setFailToastMsg("User creation failed")
        setTimeout(() => {
          setFailToastMsg("")
          setCreatingUser(false)
        }, [1000])
      }

      fetchdata()

    } catch (err) {
      console.log("Error at catch block while create a user", err)
      setFailToastMsg("OOPS!, Something went wrong on the server")
      setTimeout(() => {
        setFailToastMsg("")
        setCreatingUser(false)
      }, [1000])
    }
  }



  useEffect(() => {
    fetchdata()
  }, [])

  const handleNextScreen = () => {
    createuserdata()
  }



  async function fetchdata() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/user/list/real`,
        {
          method: "GET",

        }
      );
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setUserDetails(data)
      } else if (!response.ok && data.message) {
        setUserDetails([])
      }
    } catch (err) {
      console.log("Error at catch block while get a user list", err)
      setFailToastMsg("OOPS!, Something went wrong on the server")
      setTimeout(() => {
        setFailToastMsg("")
      }, [2000])
    }
  }







  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-20">
      <div className="w-full text-sm flex gap-4">
        <div>
          {creatinguser ? <button
            type="button"
            disabled
            className="inline-flex w-fit justify-center rounded-md bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm"
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating Random User
          </button> :
            <button
              onClick={() => creatinguser ? {} : handleNextScreen()}
              type="submit"
              disabled={creatinguser}
              className={classNames(creatinguser ? "cursor-not-allowed" : "cursor-pointer", "flex w-fit justify-center rounded-md border border-transparent bg-emerald-500 py-2 px-4 font-medium text-sm text-white shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2")}
            >
              Create Random User
            </button>}
        </div>



        <div className="flex flex-col gap-4 w-1/2">
          {toastmsg && (

            <div className="flex items-center justify-start bg-green-100 rounded-md p-2">
              <div>
                <CheckCircleIcon
                  className="w-5 h-5 mr-2 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <p className="flex text-sm text-green-600">{toastmsg}</p>
            </div>
          )}

          {failtoastmsg && (
            <div className="flex items-center justify-start bg-red-100 rounded-md p-2">
              <div>
                <ExclamationCircleIcon
                  className="w-5 h-5 mr-2 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <p className="flex text-sm text-red-600">{failtoastmsg}</p>
            </div>)}
        </div>

      </div>




      <div className="w-full py-10">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            defaultValue={tabs.find((tab) => tab.current).name}
            onChange={(event) => setActiveTab(event.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-300">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    activeTab === tab.name
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:cursor-pointer hover:border-gray-900 hover:text-gray-900",
                    "group inline-flex items-center border-b-2 py-4 px-2 font-medium"
                  )}
                  aria-current={
                    activeTab === tab.name ? "page" : undefined
                  }
                  onClick={() => setActiveTab(tab.name)}
                >
                  <tab.icon
                    className={classNames(
                      activeTab === tab.name
                        ? "text-emerald-500"
                        : "text-gray-400 group-hover:text-gray-900",
                      "-ml-0.5 mr-2 h-6 w-6"
                    )}
                    aria-current={
                      activeTab === tab.name ? "page" : undefined
                    }
                  />
                  <span>{tab.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div>
          {tabContent.map((tab) => (
            <div
              key={tab.name}
              className={classNames(
                activeTab === tab.name ? "block" : "hidden"
              )}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>


    </main>
  )
}
