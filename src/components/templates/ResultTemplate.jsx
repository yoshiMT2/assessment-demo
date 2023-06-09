import { useState } from 'react'
import RadarChart from '../radarChart'
import Toggle from '../toggle'

export default function ResultTemplate() {
  const [showThirdPersonAssessment, setShowThirdPersonAssessment] = useState(true)
  return (
    <div className='w-full bg-slate-100 overflow-auto'>
      <div className='flex place-content-center'>
        <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
          <div className='lg:grid lg:grid-cols-3 mx-10 '>
            <div className='lg:col-span-2 h-[500px] w-[500px]'>
              <RadarChart showThirdPerson={showThirdPersonAssessment} />
            </div>
            <div className='lg:col-span-1 flex flex-col mt-20 -ml-10'>
              <Toggle setShowThirdPerson={setShowThirdPersonAssessment} />
              <div className='mt-48  text-lg'>
                <div className='text-red-500'>赤：自己評価</div>
                <div className='text-blue-600'>青：第三者からの評価（平均値）</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}