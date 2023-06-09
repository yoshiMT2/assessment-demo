import { UseUserDetails} from '../../context/UserContext'

export default function Header() {
  const user = UseUserDetails()[0]
  return (
    <div className='fixed top-0 z-30 w-full flex h-16 bg-primary-1 justify-between items-center'>
      <div className='flex ml-5 items-center'>
        <p className='text-3xl'>Heart Beat</p>
        <p className='ml-3 text-2xl'>Logo</p>
      </div>
      <div className='mr-10'>
        <p className='text-[10px]'>一般社員</p>
        <p className='-mt-1 text-lg font-semibold'>{user.name}</p>
      </div>

    </div>
  )
}