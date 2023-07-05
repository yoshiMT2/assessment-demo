/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Dropdown from '../dropdown'
import SimpleRadarChart from '../radarChart/simpleChart'
import Loader from '../loader'
import { requestWithTokenRefresh } from '../../utils/AuthService'
import { SCORE_ENDPOINT } from '../../utils/constants'
import { useNavigate } from 'react-router'


export default function TeamTemplate({ data }) {
  const navigate = useNavigate()
  // const companyOptions = data ? data.company.map(c => ({value: c.id, label:c.company_name})) : null
  const [companyOptions, setCompanyOptions] = useState()
  const [subscriptionOptions, setSubscriptionOption] = useState()
  const [teamOptions, setTeamOptions] = useState()
  const [selectedCompany, setSelectedCompany] = useState()
  const [selectedSubscription, setSelectedSubscription] = useState()
  const [selectedTeam, setSelectedTeam] = useState()
  const [teamData, setTeamData] = useState()
  const [selectedMember, setSelectedMember] = useState()

  useEffect(() => {
    if (!data) { return }
    const options = data.company.map(c => ({ value: c.id, label: c.company_name }))
    setCompanyOptions(options)
    setSelectedCompany(options[0])
  }, [data])

  useEffect(() => {
    if (!selectedCompany) { return }
    const company = data.company.filter(c => c.id === selectedCompany.value)[0]
    const options = company.subscription.map(s => ({ value: s.id, label: s.subscription_activation_date }))
    setSubscriptionOption(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany])

  useEffect(() => {
    if (!selectedSubscription) { return }
    const company = data.company.filter(c => c.id === selectedCompany.value)[0]
    const subscription = company.subscription.filter(s => s.id === selectedSubscription.value)[0]
    const options = subscription.score_teams.map(t => ({ value: t.teamid_snapshot, label: t.team_name_snapshot }))
    setTeamOptions(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubscription])

  useEffect(() => {
    if (!selectedTeam) { return }
    const getMembers = async () => {
      const query = `subscription_id=${selectedSubscription.value}&team_id=${selectedTeam.value}`
      const resp = await requestWithTokenRefresh(SCORE_ENDPOINT + `members/list/?${query}`, {}, navigate)
      const data = await resp.json()
      console.log(data)
      if (resp.ok) {
        setTeamData(data)
      }
    }
    getMembers()
  }, [selectedTeam])

  useEffect(() => {
    if (!selectedMember) { return }
    console.log(selectedMember["1st"])
  }, [selectedMember])


  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      {!data
        ? <Loader />
        : (
          <div className='mx-4'>
            <div className='flex mt-4 ml-6'>
              <div className='w-64'>
                <div className='mb-2'>会社を選択</div>
                <Dropdown
                  options={companyOptions}
                  selectedOption={selectedCompany}
                  setSelectedOption={setSelectedCompany}
                />
              </div>
              <div className='w-64 ml-10'>
                <div className='mb-2'>サブスクを選択</div>
                <Dropdown
                  options={subscriptionOptions}
                  selectedOption={selectedSubscription}
                  setSelectedOption={setSelectedSubscription}
                />
              </div>
              <div className='w-64 ml-10'>
                <div className='mb-2'>チームを選択</div>
                <Dropdown
                  options={teamOptions}
                  selectedOption={selectedTeam}
                  setSelectedOption={setSelectedTeam}
                />
              </div>
            </div>
            {teamData && (
              <div className='mt-8 mx-6'>
                <div className='mb-2'>メンバーを選択</div>
                <div className='grid grid-cols-6'>
                  <div className='col-span-4 bg-white w-full h-44 overflow-y-scroll'>
                    <div className='grid grid-cols-5 -ml-2 mt-2 gap-y-2'>
                      {Object.entries(teamData.members).map(([index, member]) => (
                        <button
                          key={index}
                          className='hover:opacity-70 hover:underline transition-all'
                          onClick={() => setSelectedMember(member)}
                        >
                          {member.received_evaluations_snapshot}
                        </button>
                      ))
                      }
                    </div>
                  </div>
                  <div className='col-span-1 mx-6 bg-white w-full h-44'>
                    <div className='mt-2 text-center text-sm'>チーム平均</div>
                    <SimpleRadarChart
                      isFirst={true}
                      scores={teamData.team_scores}
                    />
                    <div></div>
                  </div>
                  <div className='col-span-1 mx-6 bg-white w-full h-44'>
                    <div className='mt-2 text-center text-sm'>ギャップ値</div>
                    <div className="mt-12 text-3xl flex justify-center items-center">{teamData.gap}</div>
                  </div>
                </div>
              </div>
            )}
            {selectedTeam && selectedMember && (
              <div className='mt-8 mx-6'>
                <div className='mb-2'>{selectedMember.received_evaluations_snapshot} のアセスメント結果</div>
                <div className=' bg-white w-full h-64 flex items-center justify-start overflow-x-scroll'>
                  <div>
                    <div className='h-44 w-72 flex flex-col items-center'>
                      <div className=' text-red-600 text-sm mb-2'>自己評価</div>
                      <SimpleRadarChart
                        isFirst={true}
                        scores={selectedMember["1st"]}
                      />
                    </div>
                  </div>
                  <div>
                    {selectedMember && selectedMember["3rd_average"] && (
                      <div className='h-44 w-72 flex flex-col items-center'>
                        <div className=' text-red-600 text-sm mb-2'>第三者からの評価（平均）</div>
                        <div className='h-44 w-72'>
                          <SimpleRadarChart
                            isFirst={false}
                            scores={selectedMember["3rd_average"]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedMember && Object.entries(selectedMember["3rd"]).map(([key, scores]) => (
                    <div key={key} >
                      <div className='h-44 w-72 flex flex-col items-center mb-2'>
                        <div className=' text-red-600 text-sm'>第三者からの評価（匿名）</div>
                        <SimpleRadarChart
                          isFirst={false}
                          scores={scores}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        )
      }

    </div>
  )
}