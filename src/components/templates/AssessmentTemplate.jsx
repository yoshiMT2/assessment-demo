/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { MarkedSlider } from '../slider'
import { Dropdown } from '../dropdown'
import Button from '../parts/Button'
import {
  QUESTIONS,
  MEMBERS,
  USER,
  DEFAULT_OPTION
} from '../../utils/constants'

export default function AssessmentTemplate() {

  const [options, setOptions] = useState()
  const [answerArray, setAnswerArray] = useState(
    QUESTIONS.map(item => ({ id: item.id, answer: 1 })
    ))

  function createAnswerArray(data) {
    if (data) {
      if (answerArray) {
        const hasObject = answerArray.some(obj => obj.id === data.id);
        if (hasObject) {
          const newArray = answerArray.filter(obj => obj.id !== data.id)
          setAnswerArray([...newArray, data].sort((a, b) => a.id - b.id))
        } else {
          setAnswerArray([...answerArray, data].sort((a, b) => a.id - b.id))
        }
      } else {
        setAnswerArray([data])
      }
    }
  }
  useEffect(() => {
    if (!MEMBERS) { return }
    const memberPlusMe = [USER, ...MEMBERS]
    const selection = memberPlusMe.filter(m => m.id === 0 || m.assessor_id === 0)
    setOptions(selection.map(s => ({ value: s.id, label: s.name })))
  }, []);

  return (
    <>
      <div>
        <div className='py-6 w-64'>
          <Dropdown
            options={options}
            defaultValue={DEFAULT_OPTION}
          />
        </div>
        <div className='w-full'>
          <div className=''>
            <ul>
              {QUESTIONS.map(
                question =>
                  <li
                    key={question.id}
                    className='py-6'
                  >
                    <p className='py-2'>{question.text}</p>
                    <MarkedSlider question={question} setAnswer={createAnswerArray} />
                  </li>
              )}
            </ul>
          </div>
        </div>
        <div className='flex justify-center py-6'>
          <Button
            title="提出する"
            className='w-80
             bg-cyan-500'
          />
        </div>


      </div>

    </>
  )
}