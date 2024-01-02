import { useEffect ,useState} from "react";

export default function CopyData(props) {

    const [usercopydetails, setUserCopyDetails] = useState([])

    useEffect(() => {
        async function fetchCopyUser() {
            try {
                const response = await fetch(
                    `https://restraunt-node.vercel.app/user/list/copy`,
                    {
                        method: "GET",

                    }
                );
                const data = await response.json();
                if (data.length > 0) {
                    setUserCopyDetails(data)
                }
            } catch (err) {

            }
        }

        fetchCopyUser()

    }, [props.data])


    return (
        <div className="my-10 flex flex-col gap-4">
            <h1 className="text-black font-bold ">CopyData Page</h1>

            {
                usercopydetails && usercopydetails ?
                    usercopydetails.map((users) => (
                        <div key={users._id}>
                            <div className="flex flex-col text-black font-bold gap-4">{users.email}</div>

                        </div>
                    ))
                    : <p>No data found</p>
            }
        </div>
    )
}