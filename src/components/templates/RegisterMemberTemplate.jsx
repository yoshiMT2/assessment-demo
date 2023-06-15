/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Dropdown from '../dropdown'
import Button from '../button'
import CsvUploader from '../csvUploader'
import MemberTable from '../table/memberTable'

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
  { company_id: 1, team_id: 1, member_id: 1, name: "長谷部誠", email: "m-hasebe@sjr.com", role: "責任者", teams: ["総務", "経理", "営業"], isActive: true },
  { company_id: 1, team_id: 1, member_id: 2, name: "本田圭佑", email: "k-honda@sjr.com", role: "一般", teams: ["総務"], isActive: true },
  { company_id: 1, team_id: 2, member_id: 3, name: "香川真司", email: "s-kagawa@sjr.com", role: "責任者", teams: ["経理", "営業"], isActive: true },
  { company_id: 1, team_id: 2, member_id: 4, name: "内田篤人", email: "a-uchida@sjr.com", role: "一般", teams: ["経理"], isActive: true },
  { company_id: 1, team_id: 3, member_id: 5, name: "吉田麻也", email: "m-yoshida@sjr.com", role: "責任者", teams: ["営業"], isActive: true },
  { company_id: 1, team_id: 3, member_id: 6, name: "大久保嘉人", email: "y-ookubo@sjr.com", role: "一般", teams: ["営業"], isActive: false },
  { company_id: 2, team_id: 4, member_id: 7, name: "岡崎慎司", email: "s-okazaki@sjr.com", role: "責任者", teams: ["人事", "経営企画", "海外事業部"], isActive: true },
  { company_id: 2, team_id: 4, member_id: 8, name: "川島永嗣", email: "e-kawashima@sjr.com", role: "一般", teams: ["人事"], isActive: true },
  { company_id: 2, team_id: 5, member_id: 9, name: "今野泰幸", email: "y-konno@sjr.com", role: "責任者", teams: ["経営企画", "海外事業部"], isActive: true },
  { company_id: 2, team_id: 5, member_id: 10, name: "長友佑都", email: "y-nagatomo@sjr.com", role: "一般", teams: ["経営企画"], isActive: false },
  { company_id: 2, team_id: 6, member_id: 11, name: "酒井宏樹", email: "h-sakai@sjr.com", role: "責任者", teams: ["海外事業部"], isActive: true },
  { company_id: 2, team_id: 6, member_id: 12, name: "遠藤保仁", email: "y-endo@sjr.com", role: "一般", teams: ["海外事業部"], isActive: true },
]
const RegistrationMethods = [
  { value: 1, label: "画面上" },
  { value: 2, label: "CSV" },
  { value: 3, label: "第三者評価者" },
]
const AssignMethods = [
  { value: 1, label: "ランダムで設定" },
  { value: 2, label: "マニュアルで設定" },
]
const Types = [
  { value: 1, label: "新規登録" },
  { value: 2, label: "編集" },
]

export default function RegisterMemberTemplate({members}) {
  // const [selectedCompany, setSelectedCompany] = useState()
  const [teamOptions, setTeamOptions] = useState()
  const [selectedTeam, setSelectedTeam] = useState()
  const [selectedMethod, setSelectedMethod] = useState(RegistrationMethods[0])
  const [selectedAssignMethod, setSelectedAssignMethod] = useState()
  const [selectedType, setSelectedType] = useState()
  const [numOfAssessor, setNumOfAssessor] = useState()
  const [teamMembers, setTeamMembers] = useState()

  // useEffect(() => {
  //   if (!selectedCompany) { return }
  //   const teams = Teams.filter(t => t.company_id === selectedCompany.value)
  //   const options = teams.map(t => ({ value: t.team_id, label: t.team_name }))
  //   setTeamOptions(options)
  //   setSelectedTeam(null)
  // }, [selectedCompany])



  useEffect(() => {
    if (!selectedTeam || !selectedMethod) {
      setTeamMembers(null)
      return
    }
    if (selectedMethod.value === 1) {
      const members = Members.filter(m => m.team_id === selectedTeam.value)
      setTeamMembers(members)
    } else {
      setTeamMembers(null)
    }
  }, [selectedTeam, selectedMethod])

  useEffect(() => {

  }, [])

  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      <div className='mx-4'>
        <div className='lg:flex'>
          {/* <div className='w-52 z-20 mt-4 ml-6'>
            <div className='mb-2'>会社を選択</div>
            <Dropdown
              options={Companies}
              placeholder="全会社"
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
            />
          </div> */}
          <div className='w-48 ml-6 mt-4 z-20'>
            <div className='mb-2'>チームを選択</div>
            <Dropdown
              options={teamOptions}
              placeholder="全チーム"
              selectedOption={selectedTeam}
              setSelectedOption={setSelectedTeam}
            />
          </div>
          <div className='w-32 ml-6 mt-4 z-20'>
            <div className='mb-2 whitespace-nowrap'>登録・編集方法</div>
            <Dropdown
              options={RegistrationMethods}
              selectedOption={selectedMethod}
              setSelectedOption={setSelectedMethod}
            />
          </div>
          {selectedMethod && selectedMethod.value === 2 && (
            <div className='w-32 ml-6 mt-4 z-20'>
              <div className='mb-2'>種別</div>
              <Dropdown
                options={Types}
                selectedOption={selectedType}
                setSelectedOption={setSelectedType}
              />
            </div>
          )}
          {selectedMethod && selectedMethod.value === 3 && (
            <div className='w-36 ml-6 mt-4 z-20'>
              <div className='mb-2 whitespace-nowrap'>第三者評価者の設定</div>
              <Dropdown
                options={AssignMethods}
                selectedOption={selectedAssignMethod}
                setSelectedOption={setSelectedAssignMethod}
              />
            </div>
          )}
          {selectedAssignMethod && (
            <div className='ml-6 mt-4 w-52'>
              <div className='mb-2 '>アサイン人数</div>
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
        {selectedMethod && selectedType && selectedMethod.value === 2 && (
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
        {members && (
          <div className={`bg-white px-2 pt-6 ${selectedMethod.value === 1 ? "mt-6" : "mt-16"} rounded-lg border`}>
            <MemberTable
              // teamName={selectedTeam.label}
              members={members} />
          </div>
        )}
        {/* <div className='bg-white px-2 pt-4 mt-6 rounded-lg border'>
            <MemberTable teamName="全メンバー" members={Members} />
          </div> */}
      </div>
    </div>
  )
}