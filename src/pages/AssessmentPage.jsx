import { useState, useEffect } from 'react'
import AssessmentTemplate from '../components/templates/AssessmentTemplate'
import { UseUserDetails } from '../context/UserContext'
import { useAtom } from 'jotai'
import { assesseeAtom } from '../utils/atom'
import { questions, questionsForOthers } from '../utils/questions';


const Assesment = () => {
  const user = UseUserDetails()[0]
  const [assessee,] = useAtom(assesseeAtom)
  const [assessmentQuestions, setAssessmentQuestions] = useState()

  useEffect(() => {
    if (!user || !assessee) { return }
    if (user.id === assessee.id) {
      setAssessmentQuestions(questions)
    } else {
      setAssessmentQuestions(questionsForOthers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className='relative top-16 flex justify-center'>
        {assessmentQuestions && (
          <AssessmentTemplate
            questions={assessmentQuestions}
            assessee={assessee}
            user={user}
          />
        )}
      </div>
    </>
  )
}

export default Assesment