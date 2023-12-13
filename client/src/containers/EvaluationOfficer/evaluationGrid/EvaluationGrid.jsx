import React from 'react'
import { TranscriptGridItem } from '../../../components'

import {HiCheckCircle, HiTrash, HiMiniEllipsisHorizontal} from 'react-icons/hi2'

function EvaluationGrid({title}) {
  return (
    <div className='flex flex-col w-full gap-y-[8px]'>
        {title && <h4>{title}</h4>}

        <div className='grid grid-cols-1 gap-y-[8px]'>
            <TranscriptGridItem  icon={<HiMiniEllipsisHorizontal fill='#FF9800' size={25}/>} />
            <TranscriptGridItem icon={<HiMiniEllipsisHorizontal fill='#FF9800' size={25}/>} />
            <TranscriptGridItem icon={<HiMiniEllipsisHorizontal fill='#FF9800' size={25}/>}/>
            <TranscriptGridItem icon={<HiMiniEllipsisHorizontal fill='#FF9800' size={25}/>}/>
           
          
        </div>
    </div>
  )
}

export default EvaluationGrid