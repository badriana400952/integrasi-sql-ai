import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { useNotif } from "./components/element/laerts";
import NavbarDemo from "./components/element/navbar";
import { useLink } from "./LinkContext";

export default function Home() {

  const [text, setText] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { notif } = useNotif();
  const { linkValue } = useLink();
  useEffect(() => {
    if (linkValue.prompt) {
      setText(linkValue.prompt)
    }
  }, [linkValue.prompt]);

  const handlegetAiTable = async () => {
    setLoading(true)
    if (!text) {
      notif({ status: "warning", content: "Anda tidak memberikan perintah" });
      setLoading(false)
      return
    }
    try {
      const response = await fetch(`/api/crudTabel?text=${text}`);
      const result = await response.json();
      setLoading(false)
      setData(result.data);
      if (response.ok) {
        notif({ status: "success", content: result.sql || "Data fetched successfully." });
      } else {
        notif({ status: "error", content: result.sql || "Failed to fetch data." });
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  const isEmpty = !data?.length && !loading
  return (
    <>
        <div className="relative flex flex-col h-[100vh] w-full overflow-hidden rounded-md  antialiased md:items-center md:justify-center">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <NavbarDemo />
        <>
          {/* TABEL */}
            <div className=" container max-w-7xl  flex-1 flex flex-col justify-center">
            {loading ? (
              <div className="relative overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-700">
                    <tr>
                      {[...Array(4)].map((_, i) => (
                        <th key={i} scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-24"></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    <tr >
                      {[...Array(4)].map((_, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-20"></div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              data?.length > 0 && (
                <>
                  <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border border-gray-200 rounded-lg shadow-xs overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-700">
                              <tr>
                                {Object.keys(data?.[0] || {}).map((key) => (
                                  <th key={key} scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                              {data.map((row, idx) => (
                                <tr
                                  key={idx}
                                >
                                  {Object.entries(row || {}).map(([key, value]: any, i) => (
                                    <td
                                      key={i}
                                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                                    >
                                      {value}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
          {/* TEXTAREA */}
          <div
            className={` w-full flex justify-center ${isEmpty ? "absolute inset-0 items-center" : "fixed bottom-0 left-0"} bg-transparent`}
          >
            <form
              className="w-full max-w-3xl"
              onSubmit={(e) => {
                e.preventDefault();
                handlegetAiTable();
              }}
            >
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex items-end p-3 mx-4 mb-6">
                <textarea
                  id="chatInput"
                  placeholder="Users ,Produk, Penjualan"
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`w-full resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 ${text.length > 300 ? "min-h-[205px]" : text.length > 75 ? "min-h-[100px]" : ""} max-h-[300px] text-base p-2`}
                ></textarea>
                <button
                  type="submit"
                  className="ml-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l15-7.5-6.75 7.5L19.5 21l-15-8.25z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </>
  )
}
