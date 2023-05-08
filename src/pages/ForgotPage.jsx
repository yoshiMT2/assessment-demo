import { NavLink } from 'react-router-dom'

const ForgotPage = () => {
  return (
    <>
      <div className='bg-indigo-500 text-white text-7xl text-center'>パスワード再設定</div>
      <NavLink to='/' className='text-3xl text-center p-6'>戻る</NavLink>
    </>
  )
}

export default ForgotPage