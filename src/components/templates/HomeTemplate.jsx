import Button from '../button';

export default function HomeTemplate() {
  return (
    <>
      <div className='w-full flex-col justify-center bg-slate-50 overflow-auto'>
        <div className='flex place-content-center'>
          <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
            <div className='mx-10'>
              <div className='mt-3 flex items-center'>
                <circle className='ml-3 h-4 w-4 bg-slate-200' />
                <p className='ml-2'>本人のアセスメントが未実施です</p>
              </div>
              <div className='mt-2 border-[0.5px] border-gray-400'></div>
            </div>
            <div className='flex justify-center items-center'>
              <Button
                title="アセスメントを受ける"
                className='my-10 md:w-96'
              />
            </div>
          </div>
        </div>
        <div className='flex place-content-center'>
          <div className='w-full mx-3 md:w-5/6 my-10 bg-white'>
          <div className='mx-10'>
              <div className='mt-3 flex items-center'>
                <circle className='ml-3 h-4 w-4 bg-slate-200' />
                <p className='ml-2'>未実施の第三者アセスメント</p>
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