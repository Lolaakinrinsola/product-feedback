import { IoIosArrowUp } from "react-icons/io";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useStore from "../utils/Store";

const RoadmapList = ({
  title,
  description,
  upvotes,
  category,
  status,
  comments,
  id
}: any) => {
    const navigate=useNavigate()
    const {  toggleUpvote, upvotedProducts } = useStore();
    const handleUpvoteClick = (id: number) => {
      toggleUpvote(id); // Toggle the upvote state
    };
  return (
    <div className="grid gap-[8px] cursor-pointer" onClick={()=>navigate(`/feedback/${id}`)}>
      <div className="flex gap-x-[16px] items-center">
        <div
          className={`rounded-full w-[8px] h-[8px] 
      ${
        status === "planned"
          ? "bg-orange"
          : status === "in-progress"
          ? "bg-primary"
          : status === "live"
          ? "bg-lightBlue"
          : ""
      }`}
        ></div>
        <p className="text-[16px] text-grey">{status}</p>
      </div>
      <p className="text-[18px] font-bold text-lightpurple">{title}</p>
      <p className="text-lightpurple text-[16px]">{description}</p>
      <div
        className={`rounded-[10px] bg-darkwhite text-darkblue px-[16px] py-[5px] w-fit font-semibold cursor-pointer mt-[17px]`}
      >
        <p>{category}</p>
      </div>

      <div className="flex justify-between">
        <div className={`h-fit flex gap-[8px] py-[11px] px-[16px] justify-center hover:bg-opacity-50 ${upvotedProducts.includes(id)?'bg-darkblue text-white':'bg-darkwhite text-darkblue'} rounded-[10px]  items-center`} onClick={()=>handleUpvoteClick(id)}>
          <IoIosArrowUp />
          <p className={` text-[13px] font-bold  ${upvotedProducts.includes(id)?' text-white':'text-lightpurple'} `}>{upvotes}</p>
        </div>
        <div className="flex gap-[8px] items-center">
          <IoChatbubbleSharp className="text-[#CDD2EE]" />
          <p className="font-bold text-[16px] text-[#3A4374]">
            {comments?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapList;
