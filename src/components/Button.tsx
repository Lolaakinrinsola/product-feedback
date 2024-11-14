import { IoIosArrowBack } from "react-icons/io";

const Button = ({ type, title, onClick, className, state }: any) => {
  return (
    <button
      className={` ${state===1?'bg-primary hover:bg-opacity-50 text-white':state===2?'bg-darkblue hover:bg-opacity-50 text-white':state===3?'bg-darkpurple hover:bg-opacity-50 text-white':state===4?'bg-[#D73737] hover:bg-orange text-white':state===5?'!bg-none !border-0 text-black hover:underline':''
       
      } py-[15px] px-[30px]  rounded-[10px] ${className}`}
      onClick={onClick}
      type={type}
    >
      <div className="flex gap-[12px] justify-between items-center font-bold">
        {state===5 && <IoIosArrowBack className="text-[#4661E6] text-[15px]" />}
        {title}
      </div>
    </button>
  );
};

export default Button;
