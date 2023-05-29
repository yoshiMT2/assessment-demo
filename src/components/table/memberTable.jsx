/* eslint-disable react/prop-types */

export default function MemberTable({ teamName, members }) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">{teamName} </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-white shadow z-10 ">
              <tr>
                <th scope="col" className="py-3.5 w-1/6 text-sm font-semibold text-gray-900">
                  名前
                  <div className="absolute inset-y-0 right-full z-0 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0   z-0 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 text-sm w-1/12 font-semibold text-gray-900 sm:table-cell"
                >
                  権限
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 w-1/4 text-sm font-semibold text-gray-900 md:table-cell"
                >
                  所属部署
                </th>
                <th scope="col" className="py-3.5 w-1/4 text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" className="py-3.5 w-1/6 text-sm font-semibold text-gray-900">
                  ステータス
                </th>
                <th scope="col" className="relative py-3.5 w-1/12">
                  <span className=""></span>
                </th>
              </tr>
            </thead>
          </table>
          <div className="h-[400px] overflow-y-auto">
            <table className="w-full w- text-center">
              <tbody >
                {members.map((person, index) => (
                  <tr key={index} >
                    <td className="relative py-4 w-1/6 text-sm font-medium text-gray-900">
                      {person.name}
                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </td>
                    <td className="hidden px-3 py-4 w-1/12 text-sm text-gray-500 sm:table-cell">{person.role}</td>
                    {person.teams && (
                      <td className="hidden px-3 py-4 w-1/4 text-sm text-gray-500 sm:table-cell">
                        {person.teams.map((team, idx) => (
                          <span key={idx}>{team} </span>
                        ))}
                      </td>
                    )}
                    <td className="hidden px-3 py-4 w-1/4 text-sm text-gray-500 md:table-cell">{person.email}</td>
                    <td className="px-3 py-4 text-sm w-1/6 text-gray-500">
                      {person.isActive
                        ? <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          有効
                        </span>
                        : <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
                        停止中
                        </span>
                      }
                    </td>
                    <td className="relative py-4 px-3 w-1/12 text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        編集<span className="sr-only">, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div >
  )
}
