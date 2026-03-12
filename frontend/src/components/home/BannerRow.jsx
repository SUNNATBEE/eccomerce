import React from 'react'
import firstImg from '../home/public/alt.svg'
import second from '../home/public/alt (1).svg'
import third from '../home/public/alt (2).svg'

const BannerRow = () => {
  return (
    <div className='bg-white py-10'>
      <div className='flex items-center justify-between max-w-[1240px] w-full m-auto'>
        <div className='max-w-[400px] w-full rounded-[10px] relative'>
          <img src={firstImg} alt="" />
          <div className='absolute top-10 left-10 max-w-[202px] w-full'>
          <p className='text-[#253D4E] font-bold text-[24px]'>Everyday Fresh &
            Clean with Our
            Products
          </p>
          <button className="max-w-[103px] w-full mt-4 w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
          Shop Now
        </button>
          </div>
        </div>

        <div className='max-w-[400px] w-full rounded-[10px] relative'>
          <img src={second} alt="" />
          <div className='absolute top-10 left-10 max-w-[202px] w-full'>
          <p className='text-[#253D4E] font-bold text-[24px]'>Make your Breakfast Healthy and Easy</p>
          <button className="max-w-[103px] w-full mt-4 w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
          Shop Now
        </button>
          </div>
        </div>

        <div className='max-w-[400px] w-full rounded-[10px] relative'>
          <img src={third} alt="" />
          <div className='absolute top-19 left-10 max-w-[202px] w-full'>
          <p className='text-[#253D4E] font-bold text-[24px]'>The best Organic
          Products Online</p>
          <button className="max-w-[103px] w-full mt-4 w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
          Shop Now
        </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerRow