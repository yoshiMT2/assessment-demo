/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputField from '../inputfield'
import Dropdown from '../dropdown'
import Button from '../button'
import { userStatusTypes } from '../../config/options'
import { useAtom } from 'jotai'
import { formAtom } from '../../utils/atom'
import Loader from '../loader'

// eslint-disable-next-line react/prop-types
export default function MemberModal({ open, title, onClose, member, teams, submitForm, loading }) {
  const [, setFormData] = useAtom(formAtom)
  const [name, setName] = useState("")
  const [hiraganaName, setHiraganaName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState(null)
  const [isActive, setIsActive] = useState({ value: true, label: "有効" })
  const [isValidData, setIsValidData] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState(
    teams
      .filter(t => t.value !== 0)
      .map(t => ({ ...t, checked: false }))
  )

  function clickHandler() {
    onClose(false)
  }

  function handleTeamCheckboxes(event) {
    const value = event.target.value;
    setSelectedTeams((prevState) =>
      prevState.map((checkbox) =>
        checkbox.value === parseInt(value)
          ? { ...checkbox, checked: event.target.checked }
          : checkbox
      )
    )
  }

  useEffect(() => {
    // if (selectedTeams === null) { return }
    const newTeams = selectedTeams
      .filter(t => t.checked === true)
      .map(t => t.value)

    const formData = {
      name: name,
      name_hiragana: hiraganaName,
      email: email,
      member_category: category,
      is_active: isActive.value,
      team_relation: newTeams
    }
    setFormData(formData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiraganaName, name, email, category, isActive, selectedTeams])


  useEffect(() => {
    let defaultTeams = selectedTeams.map(t => ({ ...t, checked: false }))
    if (!member) { return }
    setName(member.name)
    setHiraganaName(member.name_hiragana)
    setEmail(member.email)
    setCategory(member.member_category)
    setIsActive(member.is_active ? { value: true, label: "有効" } : { value: false, label: "停止中" })
    if (member.team_relation.length > 0) {
      const memberTeams = member.team_relation.map(t => t.id)
      defaultTeams = selectedTeams.map(t =>
        memberTeams.includes(t.value)
          ? ({ ...t, checked: true })
          : ({ ...t, checked: false })
      )
    }
    setSelectedTeams(defaultTeams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    if (name && hiraganaName && email && category) {
      setIsValidData(true)
    } else {
      setIsValidData(false)
    }
  }, [category, email, hiraganaName, name])


  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={clickHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="text-center sm:mt-5">
                      <Dialog.Title as="h1" className="text-2xl font-bold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-6">
                      </div>
                      <div className='mt-2'>
                        <div className='text-left font-semibold'>
                          名前
                          <span className="ml-2 text-xs text-red-600">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className='mt-2'>
                        <div className='text-left font-semibold'>
                          名前（ひらがな）
                          <span className="ml-2 text-xs text-red-600">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="text"
                          value={hiraganaName}
                          onChange={(e) => setHiraganaName(e.target.value)}
                        />
                      </div>
                      <div className='mt-2'>
                        <div className='text-left font-semibold'>
                          Email
                          <span className="ml-2 text-xs text-red-600">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='flex'>
                        <div className='mt-2'>
                          <div className='text-left font-semibold'>
                            権限
                            <span className="ml-2 text-xs text-red-600">
                              必須
                            </span>
                          </div>
                          <InputField
                            type="number"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-32"
                          />
                        </div>
                        <div className='mt-2 ml-10'>
                          <div className='text-left font-semibold mb-1.5'>
                            ステータス
                            <span className="ml-2 text-xs text-red-600">
                              必須
                            </span>
                          </div>
                          <Dropdown
                            options={userStatusTypes}
                            selectedOption={isActive}
                            setSelectedOption={setIsActive}
                          />
                        </div>
                      </div>
                      <div className='mt-4'>
                        <div className='mb-1 text-left font-semibold'>所属チーム</div>
                        {selectedTeams && (
                          <div className='grid grid-cols-2'>
                            {selectedTeams.map((t, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id={i}
                                  name="categories"
                                  type="checkbox"
                                  value={t.value}
                                  checked={t.checked}
                                  onChange={handleTeamCheckboxes}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={t.value}
                                  className="ml-3 text-gray-600"
                                >
                                  {t.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Button
                      title="送信する"
                      className="bg-primary-2 hover:bg-primary-2 px-28"
                      disabled={!isValidData}
                      onClick={submitForm}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {loading && <Loader />}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>

  )
}
