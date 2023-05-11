/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { MarkedSlider } from '../slider'

export default function AssessmentTemplate() {
  const QUESTIONS = [
    { id: 1, text: "このチームでは私の失敗が非難されがちだ" },
    { id: 2, text: "このチームでは私は言いたいことを我慢している" },
    { id: 3, text: "このチームでは自分の居場所がなく感じることがある" },
    { id: 4, text: "このチームでは私の個性が尊重されている" },
    { id: 5, text: "このチームでは私は周囲にも言いたいことを言わせている" },
    { id: 6, text: "このチームでは私はＨＥＬＰを出しにくい" },
    { id: 7, text: "このチームでは私は適度に挨拶をしている" },
    { id: 8, text: "私は自分の仕事に対する原動力が明らかになっている" },
    { id: 9, text: "私が自分が仕事において何を価値観として大事にしたいかが明らかになっている" },
    { id: 10, text: "私は自分のキャリアビジョンが描けている（短期的でもよい）" },
  ]
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
  console.log(answerArray)

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
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
        <div className='col-span-1 pl-10 pt-4'>
          {answerArray && (
            answerArray.map(answer =>
              <p key={answer.id} className='py-10'>
                問題{answer.id}の解答：　{answer.answer}
              </p>
            ))}

        </div>

      </div>
    </>
  )
}