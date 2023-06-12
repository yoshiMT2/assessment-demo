/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { MarkedSlider } from '../slider'
import Button from '../button'
import { categories } from '../../utils/questions';


export default function AssessmentTemplate({ questions, assessee, user }) {
  const storageKey = `answersFor${assessee.id}`
  const savedAnswers = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey))
    : undefined;
  // console.log(savedAnswers)

  const [answerArray, setAnswerArray] = useState(savedAnswers
    ? savedAnswers
    : questions.map(item => ({ id: item.id, category: item.category, value: item.value })
    ))

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answerArray))
  }, [answerArray, storageKey])

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

  function handleClick() {
    const scoreArr = []
    categories.forEach(c => {
      const score = answerArray.filter(q => q.category === c)
      const avg = score.reduce((total, score) => total + score.value, 0) / score.length;
      scoreArr.push(parseFloat(avg.toFixed(1)))
    })
    const payload = {
      assessorId: user.id,
      assesseeId: assessee.id,
      scoreA: scoreArr[0],
      scoreB: scoreArr[1],
      scoreC: scoreArr[2],
      scoreD: scoreArr[3],
      scoreE: scoreArr[4],
    }
    console.log(payload)
    localStorage.removeItem(storageKey)
  }


  return (
    <>
      <div>
        <div className='w-full'>
          <div className='mt-6'>
            <div className='text-center text-2xl mb-2'>{assessee.name} さんのアセスメント</div>
            <ul>
              {answerArray.map(
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
            className='w-80 bg-cyan-500'
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  )
}