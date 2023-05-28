import { useState, useEffect } from 'react'
import Dropdown from '../dropdown'
import Button from '../button'
import CsvUploader from '../csvUploader'

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
const RegistrationMethods = [
  { value: 1, label: "CSV" },
  { value: 2, label: "画面上" },
]
const AssignMethods = [
  { value: 1, label: "ランダムで設定" },
  { value: 2, label: "マニュアルで設定" },
]
const Types = [
  { value: 1, label: "新規登録" },
  { value: 2, label: "編集" },
]

export default function RegisterMemberTemplate() {
  const [selectedCompany, setSelectedCompany] = useState()
  const [teamOptions, setTeamOptions] = useState()
  const [selectedTeam, setSelectedTeam] = useState()
  const [selectedMethod, setSelectedMethod] = useState()
  const [selectedAssignMethod, setSelectedAssignMethod] = useState()
  const [selectedType, setSelectedType] = useState()
  const [numOfAssessor, setNumOfAssessor] = useState()
  const [teamMembers, setTeamMembers] = useState()

  useEffect(() => {
    if (!selectedCompany) { return }
    const teams = Teams.filter(t => t.company_id === selectedCompany.value)
    const options = teams.map(t => ({ value: t.team_id, label: t.team_name }))
    setTeamOptions(options)
    setSelectedTeam(null)
    setSelectedMethod(null)
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
          <div className='w-52'>
            <div className='mb-2'>会社を選択</div>
            <Dropdown
              options={Companies}
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
            />
          </div>
          <div className='w-48 ml-6'>
            <div className='mb-2'>チームを選択</div>
            <Dropdown
              options={teamOptions}
              selectedOption={selectedTeam}
              setSelectedOption={setSelectedTeam}
            />
          </div>
          {selectedTeam && (
            <div className='w-32 ml-6'>
              <div className='mb-2'>登録・編集方法</div>
              <Dropdown
                options={RegistrationMethods}
                selectedOption={selectedMethod}
                setSelectedOption={setSelectedMethod}
              />
            </div>
          )}
          {selectedMethod && (
            <div className='w-32 ml-6'>
              <div className='mb-2'>種別</div>
              <Dropdown
                options={Types}
                selectedOption={selectedType}
                setSelectedOption={setSelectedType}
              />
            </div>
          )}
          {selectedMethod && selectedMethod.value === 1 && (
            <div className='w-36 ml-6'>
              <div className='mb-2'>第三者評価者の設定</div>
              <Dropdown
                options={AssignMethods}
                selectedOption={selectedAssignMethod}
                setSelectedOption={setSelectedAssignMethod}
              />
            </div>
          )}
          {selectedAssignMethod && selectedAssignMethod.value === 1 && (
            <div className='ml-6 w-52'>
              <div className='mb-2 ml-2'>アサイン人数</div>
              <div className='flex h-10 items-center'>
                <input
                  type="number"
                  min={0}
                  placeholder={1}
                  value={numOfAssessor}
                  onChange={e => setNumOfAssessor(e.target.value)}
                  className="h-10 w-24 ml-2 text-center rounded border-gray-300 text-indigo-600 hover:ring-indigo-600"
                />
              </div>
            </div>
          )}
        </div>
        {selectedMethod && selectedType && selectedAssignMethod && selectedMethod.value === 1 && (
          <div className='flex mt-6 mr-10 justify-center gap-20'>
            <div className='text-center'>
              <div>CSVダウンロード</div>
              <div className='flex mt-4'>
                <Button
                  title='雛形のCSVをダウンロード'
                />
              </div>
            </div>
            <div className='text-center'>
              <div>CSVアップロード</div>
              <div className=''>
                <CsvUploader />
              </div>
            </div>

          </div>
        )}
        <div>

        </div>
      </div>
    </div>
  )
}