import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from '../assests/Image'
import Button from './Button'

const NoFeedback = () => {
    const navigate=useNavigate()
  return (
    <div className='bg-white rounded-md min-h-[calc(100vh-200px)] grid justify-center items-center text-center'>

        <div className="m-auto p-[10px] md:p-0  md:max-w-[60%] grid gap-[20px] justify-center">
            <img src={Image.notFound} alt="not found" className='mb-[50px] m-auto'/>

            <p className="font-bold text-[24px] text-lightpurple">There is no feedback yet.</p>
            <p className="text-[16px] text-grey">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Button className='h-fit w-fit m-auto mt-[30px]' title='+ Add Feedback' state={1} onClick={()=>navigate('/new-feedback')}/>
        </div>

    </div>
  )
}

export default NoFeedback