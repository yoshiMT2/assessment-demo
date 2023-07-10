import { UseUserDetails} from '../../context/UserContext'
import { useState, useEffect} from 'react'

export default function Header() {
  const user = UseUserDetails()[0]
  const [jobTitle, setJobTitle] = useState("")

  useEffect(() => {
    if (!user) { return }
    if (user.is_superuser) {
      setJobTitle("Cuoremo管理者")
    } else if (user.member_category === 99){
      setJobTitle("管理者")
    } else if (user.member_category > 1) {
      setJobTitle("マネージャー")
    } else {
      setJobTitle("一般社員")
    }
  },[])
  
  return (
    <div className='fixed top-0 z-30 w-full flex h-16 bg-primary-1 justify-between items-center'>
      <div className='flex ml-5 items-center'>
        <p className='text-3xl'>Heart Beat</p>
        <p className='ml-3 text-2xl'>Logo</p>
      </div>
      <div className='mr-10'>
        <p className='text-[14px]'>{jobTitle}</p>
        <p className='-mt-1 text-lg font-semibold'>{user.name}</p>
      </div>
    </div>
  )
}