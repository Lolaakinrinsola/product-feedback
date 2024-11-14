import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../utils/Store";
import Whitebg from "./Whitebg";

const RoadmapOptions = () => {
  const navigate = useNavigate();
  const { roadmap } = useStore();
  return (
    <Whitebg>
      <div className="flex items-center justify-between mb-[20px]">
        <p className="font-bold text-[18px] text-lightpurple ">Roadmap</p>
        <p
          className="underline text-[13px]  text-darkblue font-semibold cursor-pointer"
          onClick={() => navigate("/roadmap")}
        >
          View
        </p>
      </div>

      {roadmap.map((val: any, index: any) => (
        <div
          className="flex justify-between items-center mb-[10px]"
          key={index}
        >
          <div className="flex items-center gap-[16px] text-grey text-[16px] ">
            <div className={`rounded-full h-[8px] w-[8px] ${val.color}`}></div>
            <p>{val.text}</p>
          </div>
          <p className="text-[16px] text-grey font-bold">{val.number}</p>
        </div>
      ))}
    </Whitebg>
  );
};

export default RoadmapOptions;
