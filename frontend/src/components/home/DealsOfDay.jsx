// DealsOfDay.jsx
import React from 'react'
import firstImg from '../home/public/Organic Cage Grade A Large  Eggs.svg' // kerak bo'lsa pathni to'g'rilab o'zgartiring
import second from '../home/public/Naturally Flavored Cinnamon Vanilla.svg'
import third from '../home/public/Seeds of Change Organic Watermelon.svg'
import forth from '../home/public/Nestle Coffee Mate Coffee Creamer.svg'

const DealsOfDay = () => {
  return (
    <section className='bg-white py-8 pb-[120px]'>
      <div className='max-w-[1240px] w-full mx-auto px-4'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Deals Of The Day</h2>

        {/* Center single card like your screenshot */}
        <div className='flex justify-start'> 
          <ul className='flex items-center gap-[70px]'>
            <li className='relative w-[257px]'>
              {/* Image container (yuqorida katta rasm) */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={firstImg}
                  alt="Organic eggs"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping white card */}
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-4 bg-white w-[86%] rounded-xl shadow-[0_10px_30px_rgba(16,24,40,0.12)] p-4 z-10'>
                <p className='text-sm font-semibold text-gray-800 leading-tight line-clamp-2'>
                  Organic Cage Grade A Large Eggs
                </p>

                <p className='text-xs text-gray-400 mt-2'>
                  By <span className='text-green-500 font-medium'>Hambger Hel</span>
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <div>
                    <div className='text-green-600 font-bold text-lg'>$21.00</div>
                    <div className='text-gray-300 text-xs line-through mt-0.5'>$24.00</div>
                  </div>

                  <button className='flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-9 0a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>

              {/* spacer to allow the overlap space visually (so parent li keeps height) */}
              <div className='h-12' />
            </li>
            <li className='relative w-[257px]'>
              {/* Image container (yuqorida katta rasm) */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={second}
                  alt="Organic eggs"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping white card */}
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-4 bg-white w-[86%] rounded-xl shadow-[0_10px_30px_rgba(16,24,40,0.12)] p-4 z-10'>
                <p className='text-sm font-semibold text-gray-800 leading-tight line-clamp-2'>
                Naturally Flavored Cinnamon Vanilla
                </p>

                <p className='text-xs text-gray-400 mt-2'>
                  By <span className='text-green-500 font-medium'>Hambger Hel</span>
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <div>
                    <div className='text-green-600 font-bold text-lg'>$51.00</div>
                    <div className='text-gray-300 text-xs line-through mt-0.5'>$55.00</div>
                  </div>

                  <button className='flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-9 0a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>

              {/* spacer to allow the overlap space visually (so parent li keeps height) */}
              <div className='h-12' />
            </li>
            <li className='relative w-[257px]'>
              {/* Image container (yuqorida katta rasm) */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={third}
                  alt="Organic eggs"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping white card */}
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-4 bg-white w-[86%] rounded-xl shadow-[0_10px_30px_rgba(16,24,40,0.12)] p-4 z-10'>
                <p className='text-sm font-semibold text-gray-800 leading-tight line-clamp-2'>
                Seeds of Change Organic
Watermelon
                </p>

                <p className='text-xs text-gray-400 mt-2'>
                  By <span className='text-green-500 font-medium'>Hambger Hel</span>
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <div>
                    <div className='text-green-600 font-bold text-lg'>$61.50</div>
                    <div className='text-gray-300 text-xs line-through mt-0.5'>$66.00</div>
                  </div>

                  <button className='flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-9 0a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>

              {/* spacer to allow the overlap space visually (so parent li keeps height) */}
              <div className='h-12' />
            </li>
            <li className='relative w-[257px]'>
              {/* Image container (yuqorida katta rasm) */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={forth}
                  alt="Organic eggs"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping white card */}
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-4 bg-white w-[86%] rounded-xl shadow-[0_10px_30px_rgba(16,24,40,0.12)] p-4 z-10'>
                <p className='text-sm font-semibold text-gray-800 leading-tight line-clamp-2'>
                Nestle Coffee Mate
                Coffee Creamer
                </p>

                <p className='text-xs text-gray-400 mt-2'>
                  By <span className='text-green-500 font-medium'>Hambger Hel</span>
                </p>

                <div className='flex items-center justify-between mt-3'>
                  <div>
                    <div className='text-green-600 font-bold text-lg'>$52.80</div>
                    <div className='text-gray-300 text-xs line-through mt-0.5'>$53.80</div>
                  </div>

                  <button className='flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-9 0a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>

              {/* spacer to allow the overlap space visually (so parent li keeps height) */}
              <div className='h-12' />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default DealsOfDay