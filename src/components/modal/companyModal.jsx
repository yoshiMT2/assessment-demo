import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputField from '../inputfield'
import Datepicker from '../datepicker'
import Button from '../button'
// eslint-disable-next-line react/prop-types
export default function CompanyModal({ open, title, onClose, company }) {
  const [companyName, setCompanyName] = useState("")
  const [companyDomain, setCompanyDomain] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [updateDate, setUpdateDate] = useState()
  const [isValidData, setIsValidData] = useState(false)


  function clickHandler() {
    onClose(false)
  }
  console.log(company)

  useEffect(() => {
    if (!company) { return }
    console.log(company)
  },[company])

  useEffect(() => {
    if (companyName, companyDomain, startDate, endDate) {
      setIsValidData(true)
    } else {
      setIsValidData(false)
    }
  }, [companyDomain, companyName, endDate, startDate])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={clickHandler}>
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
                    <div className="mt-2">
                    </div>
                    <div className='mt-4'>
                      <div className='text-left font-semibold'>会社名</div>
                      <InputField
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className='mt-4'>
                      <div className='text-left font-semibold'>サブドメイン名</div>
                      <InputField
                        type="text"
                        value={companyDomain}
                        onChange={(e) => setCompanyDomain(e.target.value)}
                      />
                    </div>
                    <div className='flex'>
                      <div className='mt-4'>
                        <div className='mb-1 text-left font-semibold'>サブスク開始日</div>
                        <Datepicker dateSelected={startDate} setDate={setStartDate} />
                      </div>
                      <div className='mt-4 ml-10'>
                        <div className='mb-1 text-left font-semibold'>サブスク更新日</div>
                        <Datepicker dateSelected={updateDate} setDate={setUpdateDate} />
                      </div>
                    </div>
                    <div className='mt-4'>
                      <div className='mb-1 text-left font-semibold'>サブスク終了日</div>
                      <Datepicker dateSelected={endDate} setDate={setEndDate} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center px-24">
                  <Button
                    title="提出する"
                    className="bg-primary-2 disabled:hover:bg-primary-2"
                    disabled={!isValidData}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
