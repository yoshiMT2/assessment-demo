import { useState, useEffect } from 'react'
import RegisterCompanyTemplate from '../components/templates/RegisterCompanyTemplate'
import { COMPANY_REGISTER_ENDPOINT } from '../utils/constants'

const ResigterCompany = () => {
  const [companies, setCompanies] = useState()

  useEffect(() => {
    async function getCompanies() {
      const resp = await fetch(COMPANY_REGISTER_ENDPOINT)
      const data = await resp.json()
      setCompanies(data)
    }
    getCompanies()
  }, [])
  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {companies && (
        <RegisterCompanyTemplate
          companies={companies}
        />
      )}
    </div>)
}

export default ResigterCompany