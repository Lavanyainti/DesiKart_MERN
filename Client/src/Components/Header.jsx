import React from 'react'
import { assets } from '../../src/assets/QuickBlog-Assets/assets';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='mx-8 sm:mx-24 realtive'>
        <div className='text-center mt-20 mb-10' >
            <div className='inline-flex items-center justify-center gap-2 px-5 py-1.5 border-primary/40 bg-primary/10 rounded-full sm:text-sm'>{/*here /40 or /10 is opacity value */}
                <p>New: Village Fresh Items Added</p>
                <img src={assets.star_icon} alt="" className='w-2.5'/>
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-16 mt-5 '>Discover <span className='text-primary'>Desi Treasures</span> from Local Sellers</h1>{/*Text color = gray shade 700 (dark gray). Tailwind grays range from 100 (light) to 900 (almost black). */}
            <p className='my-6 text-gray-500 text-sm sm:text-lg sm:max-w-2xl m-auto'>From handmade crafts to organic groceries — explore authentic products directly from Indian villages, all at your fingertips.
            </p>

           
            
        </div>
      <img src={assets.gradientBackground} alt="" className='absolute -z-1 opacity-50 -top-50'/>{/*z index is negative 1 because to place it behind od everything,
       opacity make light without dominating content, we decrease top here because it takes some top above*/}
    </div>
  )
}

export default Header
