import { useEffect} from "react";
import CategoryOptions from "../components/CategoryOptions";
import  { BigNav, SmallNav } from "../components/Nav";
import NoFeedback from "../components/NoFeedback";
import RoadmapOptions from "../components/RoadmapOptions";
import SuggestionList from "../components/SuggestionList";
import useStore from "../utils/Store";

const Suggestions = () => {
  const {
    productRequest,
    setRoadmap,
    selectedBoard,
    setSelectedSort,
    selectedSort,
    freshRequest
  } = useStore();
  
  useEffect(() => {
    setRoadmap();
  }, [freshRequest]);

  useEffect(() => {
    setSelectedSort(selectedSort);
  }, [selectedBoard,freshRequest]);

  

  return (
    <div>
      {/* small screens */}
      
      <SmallNav/>
      <div className="min-h-screen bg-darkwhite grid  lg:grid-cols-[1fr_3fr] px-[15px] md:px-[4%] lg:px-[11%] py-[20px] md:py-[56px] lg:py-[94px] gap-[30px]">
        <div className=" hidden md:grid md:grid-cols-3 lg:grid-cols-1 gap-[30px] h-fit ">
          <div className="rounded-[10px] min-h-[137px] w-full grid items-end bg-custom-radial p-[24px]">
            <div className="grid text-white h-fit">
              <p className="text-[20px] font-semibold">Frontend Mentor</p>
              <p className="text-opacity-[75%] text-[15px]">Feedback Board</p>
            </div>
          </div>
          <CategoryOptions/>
          <RoadmapOptions/>
        </div>

        <div className="grid gap-[30px] h-fit">
          <div className="hidden md:block">
            <BigNav/>
          </div>
          {productRequest.length === 0 ? (
            <NoFeedback />
          ) : (
            productRequest.map((val: any, index: any) => (
              <SuggestionList
                title={val.title}
                category={val.category}
                upvotes={val.upvotes}
                description={val.description}
                comments={val.comments}
                id={val.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
