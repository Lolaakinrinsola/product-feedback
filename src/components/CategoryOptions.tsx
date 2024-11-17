import { useEffect } from 'react';
import useStore from '../utils/Store';
import Whitebg from './Whitebg'

const CategoryOptions = () => {
    const {
    board,
    setSelectedBoard,
    selectedBoard,
    freshRequest
  } = useStore();
  function handleClick(val: any) {
    setSelectedBoard(val);
  }

  useEffect(() => {
    if(selectedBoard==='All') return
    setSelectedBoard(selectedBoard)
  }, [freshRequest])
  
  return (
    <Whitebg>
            <div className="flex flex-wrap gap-[8px]">
              {board.map((val: any, index: any) => (
                <div
                  className={`rounded-[10px] bg-darkwhite text-darkblue px-[16px] py-[5px] w-fit font-semibold cursor-pointer ${
                    selectedBoard === val && "!bg-darkblue   text-white"
                  } hover:bg-darkpurple hover:bg-opacity-20 `}
                  key={index}
                  onClick={() => handleClick(val)}
                >
                  <p>{val}</p>
                </div>
              ))}
            </div>
          </Whitebg>
  )
}

export default CategoryOptions