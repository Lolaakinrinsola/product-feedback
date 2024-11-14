import Whitebg from './Whitebg'
import { IoIosArrowUp } from "react-icons/io";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import useStore from '../utils/Store';

const SuggestionList = ({title,category,upvotes,status,description,comments,id}:any) => {
    const navigate=useNavigate()
    const {  toggleUpvote, upvotedProducts } = useStore();
    const handleUpvoteClick = (id: number) => {
      toggleUpvote(id); // Toggle the upvote state
    };
  
    const comment=comments? comments.length:0
  return (
    <Whitebg className='cursor-pointer'>
        <div className="flex justify-between items-center" onClick={()=>navigate(`/feedback/${id}`)}>
            <div className="flex items-start gap-[40px]">
                <div className={`h-fit grid p-[14px] justify-center hover:bg-opacity-50 ${upvotedProducts.includes(id)?'bg-darkblue text-white':'bg-darkwhite text-lightpurple'}   rounded-[10px]  items-center`} onClick={()=>handleUpvoteClick(id)}>
                <IoIosArrowUp />
                <p className=" text-[13px] font-bold">{upvotes}</p>
                </div>

                <div className="grid">
                    <p className="font-bold text-[18px] text-lightpurple">{title}</p>
                    <p className="text-[16px] text-grey">{description}</p>
                    <div
                className={`rounded-[10px] bg-darkwhite text-darkblue px-[16px] py-[5px] w-fit font-semibold cursor-pointer mt-[17px]`}
              >
                <p>{category}</p>
              </div>
                </div>

            </div>
            <div className="flex gap-[8px] items-center">
                <IoChatbubbleSharp className='text-[#CDD2EE]'/>
                <p className="font-bold text-[16px] text-[#3A4374]">{comment}</p>
            </div>
        </div>
    </Whitebg>
  )
}

export default SuggestionList