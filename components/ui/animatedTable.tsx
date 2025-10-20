import Image from "next/image";

export default function AnimatedTable({ data }: { data: any[] }) {
  console.log("dataaaaaaaaa", data)
  return (
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
                        {key === "image" ? (
                          <Image
                            src={
                              value.startsWith("http")
                                ? value
                                : `/images/${value}` // misal: file kamu ada di public/images/image.jpg
                            }
                            alt={row.nama_produk}
                            width={50}
                            height={50}
                            className="rounded object-cover"
                          />
                        ) : (
                          value
                        )}
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
  );
}
