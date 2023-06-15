import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import RegisterTeamTemplate from '../components/templates/RegisterTeamTemplate'
import { TEAM_ENDPOINT } from '../utils/constants'
import { requestWithTokenRefresh } from '../utils/AuthService'
import { UseUserDetails } from '../context/UserContext'

const ResigterTeam = () => {
  const navigate = useNavigate()
  const user = UseUserDetails()[0]
  const [teams, setTeams] = useState()

  const fetchTeams = useCallback(async () => {
    const resp = await requestWithTokenRefresh(TEAM_ENDPOINT + 'list', {}, navigate)
      const data = await resp.json()
      setTeams(data)
  },[navigate])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      {/* {teams && ( */}
        <RegisterTeamTemplate
          teams={teams}
          companyId={user.company_relation.id}
          refreshData={fetchTeams}
        />
      {/* )} */}
    </div>)
}

export default ResigterTeam