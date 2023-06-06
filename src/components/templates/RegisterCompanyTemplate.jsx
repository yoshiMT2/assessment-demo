import { useState } from 'react'
import CompanyTable from '../table/companyTable'
import CompanyModal from '../modal/companyModal'
import { companyAtom } from '../../utils/atom'
import { useAtom } from 'jotai'
import { COMPANY_REGISTER_ENDPOINT } from '../../utils/constants'

// eslint-disable-next-line react/prop-types
export default function RegisterCompanyTemplate({companies}) {
  const [formData] = useAtom(companyAtom)
  const [company, setCompany] = useState()
  const [showModal, setShowModal] = useState(false)
  async function handleSubmit () {
    const resp = await fetch(COMPANY_REGISTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await resp.json()
    console.log(data)
    if (data.status) {
      console.log(data.status)
    }
  }
  console.log(formData)
  return (
    <div className='w-full bg-slate-100 overflow-auto px-6'>
      <div className="bg-white px-2 pt-6 mt-6 rounded-lg border">
        <CompanyTable
          companies={companies}
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
          submitForm={handleSubmit}
        />
      )}
    </div>
  )
}
