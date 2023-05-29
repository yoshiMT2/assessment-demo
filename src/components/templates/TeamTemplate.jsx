import { useState, useEffect } from 'react'
import Dropdown from '../dropdown'
import RadarChart from '../radarChart'

const Companies = [
  { value: 1, label: "丸紅" },
  { value: 2, label: "三井物産" }
]
const Teams = [
  { company_id: 1, team_id: 1, team_name: "総務" },
  { company_id: 1, team_id: 2, team_name: "経理" },
  { company_id: 1, team_id: 3, team_name: "営業" },
  { company_id: 2, team_id: 4, team_name: "人事" },
  { company_id: 2, team_id: 5, team_name: "経営企画" },
  { company_id: 2, team_id: 6, team_name: "海外事業部" },
]
const Members = [
  { company_id: 1, team_id: 1, member_id: 1, member_name: "長谷部誠" },
  { company_id: 1, team_id: 1, member_id: 2, member_name: "本田圭佑" },
  { company_id: 1, team_id: 2, member_id: 3, member_name: "香川真司" },
  { company_id: 1, team_id: 2, member_id: 4, member_name: "内田篤人" },
  { company_id: 1, team_id: 3, member_id: 5, member_name: "吉田麻也" },
  { company_id: 1, team_id: 3, member_id: 6, member_name: "大久保嘉人" },
  { company_id: 2, team_id: 4, member_id: 7, member_name: "岡崎慎司" },
  { company_id: 2, team_id: 4, member_id: 8, member_name: "川島永嗣" },
  { company_id: 2, team_id: 5, member_id: 9, member_name: "今野泰幸" },
  { company_id: 2, team_id: 5, member_id: 10, member_name: "長友佑都" },
  { company_id: 2, team_id: 6, member_id: 11, member_name: "酒井宏樹" },
  { company_id: 2, team_id: 6, member_id: 12, member_name: "遠藤保仁" },
]
const NumOfCharts = Members.slice(0, 5)

export default function TeamTemplate() {
  const [selectedCompany, setSelectedCompany] = useState()
  const [teamOptions, setTeamOptions] = useState()
  const [selectedTeam, setSelectedTeam] = useState()
  const [teamMembers, setTeamMembers] = useState()
  const [selectedMember, setSelectedMember] = useState()

  function handleClick(member) {
    setSelectedMember(member)
  }
  useEffect(() => {
    if (!selectedCompany) { return }
    const teams = Teams.filter(t => t.company_id === selectedCompany.value)
    const options = teams.map(t => ({ value: t.team_id, label: t.team_name }))
    setTeamOptions(options)
    setSelectedTeam(null)
    setSelectedMember(null)

  }, [selectedCompany])

  useEffect(() => {
    if (!selectedTeam) {
      setTeamMembers(null)
      return
    }
    const members = Members.filter(m => m.team_id === selectedTeam.value)
    setTeamMembers(members)
  }, [selectedTeam])

  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      <div className='mx-4'>
        <div className='flex mt-4 ml-6'>
          <div className='w-64'>
            <div className='mb-2'>会社を選択</div>
            <Dropdown
              options={Companies}
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
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
        {teamMembers && (
          <div className='mt-8 ml-6'>
            <div className='mb-2'>メンバーを選択</div>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 bg-white w-full h-44 overflow-y-scroll'>
                <div className='grid grid-cols-6 -ml-2 mt-2 gap-y-2'>
                  {teamMembers.map((member, index) => (
                    <button
                      key={index}
                      className='hover:opacity-70 hover:underline transition-all'
                      onClick={() => handleClick(member)}
                    >
                      {member.member_name}
                    </button>
                  ))
                  }
                </div>
              </div>
              <div className='col-span-1 ml-6 bg-white w-5/6 h-44'>
                <div className='text-center text-sm'>チーム平均</div>
                <RadarChart />
              </div>
            </div>
          </div>
        )}
        {selectedTeam && selectedMember && (
          <div className='mt-8 mx-6'>
            <div className='mb-2'>{selectedMember.member_name} のアセスメント結果</div>
            <div className=' bg-white w-full h-64 flex items-center justify-start overflow-x-scroll'>
              <div>
                <div className='h-44 w-72 '>
                  <div className='ml-10 text-red-600 text-sm'>自己評価</div>
                  <RadarChart />
                </div>
              </div>
              <div>
                <div className='h-44 w-72'>
                  <div className='ml-10 text-red-600 text-sm'>第三者からの評価（平均）</div>
                  <RadarChart />
                </div>
              </div>

              {NumOfCharts.map((member, index) => (
                <div key={index} >
                  <div className='h-44 w-72'>
                    <div className='ml-10 text-red-600 text-sm'>第三者からの評価（匿名）</div>
                    <RadarChart />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}