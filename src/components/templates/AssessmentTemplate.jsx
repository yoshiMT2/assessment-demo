/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { MarkedSlider } from '../slider'
import Button from '../button'


export default function AssessmentTemplate({ answers, assessment, updateAnswer, submitAnswers}) {

  const [userAnswers, setUserAnswers] = useState(answers ? answers : null)

  function updateAnswerArray(data) {
    if(data) {
      if (userAnswers) {
        const hasObject = userAnswers.some(obj => obj.id === data.id)
        if (hasObject) {
          const newAnswers = userAnswers.filter(obj => obj.id !== data.id)
          const an = [...newAnswers, data].sort((a,b) => a.id - b.id)
          setUserAnswers([...newAnswers, data].sort((a,b) => a.id - b.id))
        } else {
          setUserAnswers([...userAnswers, data].sort((a,b) => a.id - b.id))
        }
      }
      updateAnswer(data)
    }
  }

  return (
    <>
      <div>
        <div className='w-full'>
          <div className='mt-6'>
            <div className='text-center text-2xl mb-2'>{assessment.received_evaluations_name} さんのアセスメント</div>
            <ul>
              {userAnswers && userAnswers.map(
                answer => (
                  <li
                    key={answer.id}
                    className='py-6'
                  >
                    {answer.quiz_relation.quiz && <p className='py-2'>{answer.quiz_relation.quiz}</p>}
                    <MarkedSlider answer={answer} setAnswer={updateAnswerArray} />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className='flex justify-center py-6'>
          <Button
            title="提出する"
            className='w-80 bg-cyan-500'
            onClick={submitAnswers}
          />
        </div>
      </div>
    </>
  )
}