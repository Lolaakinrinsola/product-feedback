import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Image } from "../assests/Image";
import useStore from "../utils/Store";
import Backdrop from "./Backdrop";
import Button from "./Button";
import CategoryOptions from "./CategoryOptions";
import RoadmapOptions from "./RoadmapOptions";

const Nav = ({ children, className }: any) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-[10px] p-[24px] w-full flex justify-between bg-[#373F68] ${className}`}
    >
      {children}

      <Button
        title="+ Add Feedback"
        state={1}
        onClick={() => navigate("/new-feedback")}
        className="h-fit"
      />
    </div>
  );
};

export default Nav;

export const BigNav = () => {
  const { productRequest, setSelectedSort, sort, selectedSort } = useStore();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleSelectSort = (sortOption: string) => {
    setSelectedSort(sortOption);
    setIsDropdownVisible(false);
  };
  return (
    <Nav>
      <div className="flex items-center gap-[38px] relative">
        <div className="hidden md:flex gap-[16px] items-center">
          <img src={Image.logo} alt="logo" />
          <p className="font-bold text-white">
            {productRequest.length} Suggestions
          </p>
        </div>

        <div className="flex items-center text-[14px]relative">
          <p className="text-darkwhite cursor-pointer" onClick={toggleDropdown}>
            Sort by : {selectedSort}
          </p>
          <MdKeyboardArrowDown className="text-white text-[30px]" />
          {/* <div className="absolute bottom-[-210px] rounded-md bg-white w-[200px] cursor-pointer"> */}
          {isDropdownVisible && (
            <div className="absolute bottom-[-210px] rounded-md bg-white w-[200px] cursor-pointer shadow-lg">
              {sort.map((val: any, index: any) => (
                <div
                  key={index}
                  className={`p-[10px] px-[20px] border-b-[1px] hover:text-primary ${
                    selectedSort === val && "bg-grey text-white"
                  }`}
                  onClick={() => handleSelectSort(val)}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </Nav>
  );
};

export const SmallNav = () => {
  const { productRequest, sort, selectedSort, setSelectedSort } = useStore();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleSelectSort = (sortOption: string) => {
    setSelectedSort(sortOption);
    setIsDropdownVisible(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenuDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="md:hidden">
    <div className={`w-full bg-custom-radial py-[16px] px-[24px] ${isOpen&&'fixed '} flex z-30 items-center justify-between md:hidden`}>
        <div className={`grid  text-white h-fit`}>
          <p className="text-[20px] font-semibold">Frontend Mentor</p>
          <p className="text-opacity-[75%] text-[15px]">Feedback Board</p>
        </div>
        <div className="md:hidden cursor-pointer" onClick={toggleMenuDropdown}>
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "translate-y-1.5 rotate-45" : "mb-1"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "mb-1"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          ></div>

          {isOpen&&<Backdrop onClose={toggleMenuDropdown} className='top-[85px] left-0 justify-end'>
          <div className="w-[60%] bg-darkwhite h-screen p-[20px] absolute right-0">
            <div className="h-fit grid gap-[20px]">

<CategoryOptions/>
<RoadmapOptions/>
            </div>
          </div>
          </Backdrop>}
        </div>
      </div>
    <Nav className={`!rounded-none ${isOpen&&'pt-[90px]'} `}>
      <div className="flex items-center gap-[38px] relative">
        <div className="hidden md:flex gap-[16px] items-center">
          <img src={Image.logo} alt="logo" />
          <p className="font-bold text-white">
            {productRequest.length} Suggestions
          </p>
        </div>

        <div className="flex items-center text-[14px]relative">
          <p className="text-darkwhite cursor-pointer" onClick={toggleDropdown}>
            Sort by : {selectedSort}
          </p>
          <MdKeyboardArrowDown className="text-white text-[30px]" />
          {isDropdownVisible && (
            <div className="absolute bottom-[-210px] rounded-md bg-white w-[200px] cursor-pointer shadow-lg">
              {sort.map((val: any, index: any) => (
                <div
                  key={index}
                  className={`p-[10px] px-[20px] border-b-[1px] hover:text-primary ${
                    selectedSort === val && "bg-grey text-white"
                  }`}
                  onClick={() => handleSelectSort(val)}
                >
                  {val}
                </div>
              ))}
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </Nav>
    </div>
  );
};
