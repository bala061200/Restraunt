import { useState } from "react";
import {
    ExclamationCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/20/solid";



function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}



export default function RealData(props) {

    const [coping, setCoping] = useState(false)
    const [toastmsg, setToastMsg] = useState("")
    const [failtoastmsg, setFailToastMsg] = useState("")
    const [copyingdata, setCopyingdata] = useState()

    const handleCopydata = async (user) => {
        setCopyingdata(user)
        setCoping(true)
        try {
            const response = await fetch(
                `https://restraunt-node.vercel.app/user/create/copy`,
                {
                    method: "POST",
                    headers: {
                        email: user.email
                    }
                }
            );

            const data = await response.json();
            if (response.ok && data) {


                if (data.message == "Already user found") {
                    setFailToastMsg(data.message)
                    setTimeout(() => {
                        setFailToastMsg("")
                        setCoping(false)
                    }, [1500])
                } else {
                    setToastMsg("Data copied successfully to another db")
                    setTimeout(() => {
                        setToastMsg("")
                        setCoping(false)
                    }, [1500])
                }

            } else if (!response.ok && data.message) {
                setFailToastMsg(data.message)
                setCoping(false)
                setTimeout(() => {
                    setFailToastMsg("")
                    setCoping(false)
                }, [1500])
            }


        } catch (err) {
            console.log("createdcopydaataaa error", err)
            setFailToastMsg("OOPS!, Something went wrong on the server")
            setTimeout(() => {
                setFailToastMsg("")
                setCoping(false)
            }, [1500])
        }


    }


    let userdata = props.listdata ? props.listdata : []
    return (

        <>
            <div className="my-10 flex flex-col gap-4">

                <h1 className="text-black font-bold ">RealData Page</h1>

                {
                    userdata.map((users) => (
                        <div key={users._id} className="">
                            <div className="flex gap-4 py-4 px-4 w-1/2 items-center border rounded-lg bg-white hover:border-emerald-600 hover:shadow-md">
                                <div className="flex justify-start w-full flex-col text-black font-bold gap-4">{users.email}</div>
                                <div className="flex justify-end w-full">
                                    {copyingdata == users && coping == true ?
                                        <button
                                            type="button"
                                            disabled
                                            className="inline-flex w-fit justify-center rounded-md bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm"
                                        >
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/1500/svg"
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
                                            Copying to another page
                                        </button>
                                        :
                                        <button
                                            onClick={() => coping ? {} :
                                                handleCopydata(users)}
                                            type="submit"
                                            disabled={coping}
                                            className={classNames(coping == true ? "cursor-not-allowed" : "Curosr-pointer", "flex w-fit  justify-center rounded-md border border-transparent bg-emerald-600   items-center  py-2  px-4 font-medium text-sm text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2")}
                                        >
                                            Copy to another page
                                        </button>}
                                </div>


                            </div>

                        </div>
                    ))

                }






            </div>

            <div className="mt-4 flex flex-col gap-4 w-1/2">
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

        </>

    )
}