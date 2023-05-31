import { useState } from 'react'
import CompanyTable from '../table/companyTable'
import CompanyModal from '../modal/companyModal'

const Companies = [
  { id: 1, name: "丸紅", createdAt: "2022/04/01", startedAt: "2022/05/06", updatedAt: "2023/04/01", endedAt: "2022/08/31", subDomain: "marubeni" },
  { id: 2, name: "三井物産", createdAt: "2023/01/04", startedAt: "2023/04/01", updatedAt: "", endedAt: "2023/06/30", subDomain: "bussan" },
]

export default function RegisterCompanyTemplate() {
  const [company, setCompany] = useState()
  const [showModal, setShowModal] = useState(false)
  console.log(company)
  return (
    <div className='w-full bg-slate-100 overflow-auto px-6'>
      <div className="bg-white px-2 pt-6 mt-6 rounded-lg border">
        <CompanyTable
          companies={Companies}
          setShowModal={setShowModal}
          setCompanyToEdit={setCompany}
        />
      </div>
      {showModal && (
        <CompanyModal
          open={showModal}
          onClose={setShowModal}
          title="会社登録フォーム"
          msg="必要事項を入力して、提出ボタンを押してください。"
          status="success"
          company={company}
        />
      )}
    </div>

  )
}
