import { useState, useEffect, useCallback } from 'react'
import RegisterCompanyTemplate from '../components/templates/RegisterCompanyTemplate'
import { COMPANY_ENDPOINT } from '../utils/constants'
import { requestWithTokenRefresh } from '../utils/AuthService'

const ResigterCompany = () => {
  const [companies, setCompanies] = useState()

  const fetchCompanies = useCallback(async () => {
    const resp = await requestWithTokenRefresh(COMPANY_ENDPOINT)
      const data = await resp.json()
      setCompanies(data.data)
  },[])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {companies && (
        <RegisterCompanyTemplate
          companies={companies}
          refreshData={fetchCompanies}
        />
      )}
    </div>)
}

export default ResigterCompany