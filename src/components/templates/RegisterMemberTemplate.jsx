/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { formAtom } from '../../utils/atom'
import Dropdown from '../dropdown'
import Button from '../button'
import CsvUploader from '../csvUploader'
import { DownloadCSV } from '../../utils/csv'
import { RegisterationHeaders, explanationRow } from '../../config/csvHeaders'
import { RegistrationMethods, RegistrationTypes, AssignMethods } from '../../config/options'
import MemberTable from '../table/memberTable'
import CSVDataTable from '../table/csvDataTable'
import MemberModal from '../modal/memberModal'
import ConfirmationModal from '../modal'
import { BACKEND_URL, MEMBER_ENDPOINT } from '../../utils/constants'
import { requestWithTokenRefresh } from '../../utils/AuthService'


export default function RegisterMemberTemplate({ members, teams, refreshData }) {
  const [selectedTeam, setSelectedTeam] = useState({ value: 0, label: "全チーム" })
  const [selectedMethod, setSelectedMethod] = useState(RegistrationMethods[0])
  const [selectedAssignMethod, setSelectedAssignMethod] = useState()
  const [selectedType, setSelectedType] = useState(RegistrationTypes[0])
  const [numOfAssessor, setNumOfAssessor] = useState()
  const [teamMembers, setTeamMembers] = useState()
  const [columnHeaders, setColumnHeaders] = useState()
  const [uploadedData, setUploadedData] = useState()
  const [formData,] = useAtom(formAtom)
  const [member, setMember] = useState()
  const [status, setStatus] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showComfirmation, setShowComfirmation] = useState(false)

  useEffect(() => {
    if (!selectedMethod) { return }
    if (selectedMethod.value !== 2) {
      setUploadedData({})
    }
  }, [selectedMethod])

  useEffect(() => {
    if (selectedTeam.value === 0) {
      setTeamMembers(members)
    } else {
      const teamMembers =
        members.filter(m =>
          m.team_relation.some(team =>
            team.id === selectedTeam.value))
      setTeamMembers(teamMembers)
    }
  }, [members, selectedTeam])

  useEffect(() => {
    if (!teams) { return }
    let headers;
    let secondRow;
    if (selectedMethod.value === 3) {
      return
    } else {
      if (selectedType.value === 1) {
        const teamNames =
          teams
            .filter(t => t.label !== "全チーム")
            .map(t => t.label)
        headers = [...RegisterationHeaders, ...teamNames]
        // eslint-disable-next-line no-unused-vars
        const teamExplanations = teamNames.map(_ => "所属する場合は1を記入してください")
        secondRow = [...explanationRow, ...teamExplanations]
      }
    }
    setColumnHeaders([headers, secondRow])
  }, [teams])

  async function handleSubmit() {
    setIsLoading(true)
    const url = member ? MEMBER_ENDPOINT + 'update/' + member.id + '/' : MEMBER_ENDPOINT + 'create/'
    const method = member ? 'PATCH' : 'POST'
    console.log(formData)
    const resp = await requestWithTokenRefresh(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (resp.status === 200 || resp.status === 201) {
      setStatus("success")
    } else {
      setStatus("failed")
    }
    setShowModal(false)
    setIsLoading(false)
    setShowComfirmation(true)
  }

  async function handleCSVDataSubmit() {
    setIsLoading(true)
    const url = selectedMethod.value === 1 ? BACKEND_URL + 'upload_csv/' : BACKEND_URL + 'update_csv/'
    const resp = await requestWithTokenRefresh(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadedData),
    })
    if (resp.status === 200 || resp.status === 201) {
      setStatus("success")
    } else {
      setStatus("failed")
    }
    setShowModal(false)
    setIsLoading(false)
    setShowComfirmation(true)
  }

  console.log(uploadedData)

  function handleConfirm() {
    refreshData()
    setShowComfirmation(false)
  }

  function handleButtonClick() {
    if (selectedType.value === 1) {
      DownloadCSV(columnHeaders)
    } else if (selectedType.value === 2) {
      const memberData =
        members
          .map(m => [
            m.id,
            m.email,
            m.name,
            m.name_hiragana,
            m.member_category,
            m.is_active,
            ...m.teamArray
          ])
      const csvData = columnHeaders.concat(memberData)
      DownloadCSV(csvData)
    }
  }

  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      <div className='mx-4'>
        <div className='lg:flex'>
          <div className='w-48 ml-6 mt-4 z-20'>
            <div className='mb-2'>チームを選択</div>
            <Dropdown
              options={teams}
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
                options={RegistrationTypes}
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
                  onClick={handleButtonClick}
                />
              </div>
            </div>
            <div className='text-center'>
              <div>CSVアップロード</div>
              <div className=''>
                <CsvUploader
                  uploadData={setUploadedData}
                />
              </div>
            </div>
          </div>
        )}
        {members && selectedMethod.value === 1 && (
          <div className={`bg-white px-2 pt-6 ${selectedMethod.value === 1 ? "mt-6" : "mt-16"} rounded-lg border`}>
            <MemberTable
              members={teamMembers}
              team={selectedTeam}
              setShowModal={setShowModal}
              setMemberToEdit={setMember}
            />
          </div>
        )}
        {uploadedData !== undefined && uploadedData.length > 0 && (
          <div className={`bg-white px-2 pt-6 ${selectedMethod.value === 1 ? "mt-6" : "mt-16"} rounded-lg border`}>
            <CSVDataTable
              data={uploadedData}
              type={selectedType}
              setShowModal={setShowModal}
              submitData={handleCSVDataSubmit}
            />
          </div>
        )}

      </div>
      {showModal && (
        <MemberModal
          open={showModal}
          onClose={setShowModal}
          title="メンバー登録・編集フォーム"
          msg="必要事項を入力して、送信ボタンを押してください。"
          member={member}
          teams={teams}
          loading={isLoading}
          submitForm={handleSubmit}
        />
      )}
      {showComfirmation && (
        <ConfirmationModal
          open={showComfirmation}
          title={status === "success"
            ? "データ登録・更新完了"
            : "登録・更新失敗"
          }
          msg={status === "success"
            ? "ユーザーの登録・更新が正常に終了しました。"
            : "登録・更新に失敗しました。"
          }
          status={status}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}