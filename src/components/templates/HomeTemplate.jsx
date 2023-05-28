import { NavLink } from 'react-router-dom';
import Button from '../button';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function HomeTemplate() {
  return (
    <>
      <div className='w-full flex-col justify-center bg-slate-100 overflow-auto'>
        <div className='flex place-content-center'>
          <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
            <div className='mx-10'>
              <div className='mt-3 flex items-center'>
                <ExclamationCircleIcon className='ml-3 h-5 w-5 text-slate-400' />
                <p className='ml-2'>自分自身のアセスメント</p>
              </div>
              <div className='mt-2 border-[0.5px] border-gray-400'></div>
            </div>
            <div className='flex justify-center items-center'>
            <NavLink to='/assessment'>
              <Button
                title="アセスメントを実施する"
                className='my-10 md:w-96'
              />
            </NavLink>
            </div>
          </div>
        </div>
        <div className='flex place-content-center'>
          <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
            <div className='mx-10'>
              <div className='mt-3 flex items-center'>
                <ExclamationCircleIcon className='ml-3 h-5 w-5 text-slate-400' />
                <p className='ml-1'>第3者のアセスメント</p>
              </div>
              <div className='mt-2 border-[0.5px] border-gray-400'></div>
            </div>
            <div className='my-6 flex flex-col justify-center items-center gap-y-6'>
              <Button
                title="Aさんのアセスメントを実施する"
                className='md:w-96'
              />
              <Button
                title="Bさんのアセスメントを実施する"
                className='md:w-96'
              />
              <Button
                title="Cさんのアセスメントを実施する"
                className='md:w-96'
              />
            </div>
          </div>
        </div>


      </div>
    </>
  )
}