import CompanyTable from '../table/companyTable'

const Companies = [
  { id: 1, name: "丸紅", createdAt: "2022/04/01", startedAt: "2022/05/06", updatedAt: "2023/04/01", endedAt: "2022/08/31", subDomain: "marubeni" },
  { id: 2, name: "三井物産", createdAt: "2023/01/04", startedAt: "2023/04/01", updatedAt: "", endedAt: "2023/06/30", subDomain: "bussan" },
]

export default function RegisterCompanyTemplate() {
  return (
    <div className='w-full bg-slate-100 overflow-auto px-6'>
      <div className="bg-white px-2 pt-6 mt-6 rounded-lg border">
        <CompanyTable companies={Companies} />
      </div>
    </div>
  )
}
