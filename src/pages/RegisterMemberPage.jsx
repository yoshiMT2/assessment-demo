import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import RegisterMemberTemplate from '../components/templates/RegisterMemberTemplate'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { MEMBER_ENDPOINT } from '../utils/constants'


const ResigterMember = () => {
  const navigate = useNavigate()
  const [members, setMembers] = useState()
  const fetchCompanies = useCallback(async () => {
    const resp = await requestWithTokenRefresh(MEMBER_ENDPOINT + 'list/', {}, navigate)
      const data = await resp.json()
      console.log(data)
      setMembers(data)
  },[navigate])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])
  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      <RegisterMemberTemplate
        members={members}
      />
    </div>)
}

export default ResigterMember