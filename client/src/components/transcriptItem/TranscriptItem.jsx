import { ClassNames } from '@emotion/react'
import React from 'react'

function TranscriptItem({cols, item}) {
  return (
<<<<<<< HEAD
    <div className={`grid md:text-black grid-cols-4 p-2`}>
  <td className='text-[#6B3FA0] font-bold'>Uj-009</td>
  <td className='text-black'>Manoah Luka k</td>
  <td className='text-black'>Mathematics</td>
  <td className='text-black'>2019/2020</td>
</div>

=======
    <div className={`grid md:text-[14px] grid-cols-4 p-2 border-b rounded-md`}>
      <td className='text-[#6B3FA0] font-bold'>Uj-009</td>
      <td>Manoah Luka k</td>
      <td>Mathematics</td>
      <td>2019/2020</td>
    </div>
>>>>>>> origin/godwin
  )
}

export default TranscriptItem