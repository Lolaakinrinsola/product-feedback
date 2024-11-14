import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import DefaultInput from "../components/DefaultInput";
import SuggestionList from "../components/SuggestionList";
import Whitebg from "../components/Whitebg";
import useStore from "../utils/Store";

const FeedbackDetail = () => {
  const [reply, setreply] = useState('')
  const [comment, setcomment] = useState('')
  const navigate = useNavigate();
  const { id }: any = useParams();
  const {
    productRequest,
    selectedCommentId,
    setSelectedCommentId,
    resetSelectedCommentId,
    addCommentOrReply
  } = useStore();
  const handleReplyClick = (id: any) => {
    if (selectedCommentId === id) {
      resetSelectedCommentId();
    } else {
      setSelectedCommentId(id);
    }
  };

  function handleChange(e:any) {
    setreply(e.target.value)
  }
  function handlecommentChange(e:any) {
    setcomment(e.target.value)
  }
  const remainingChars = 250 - comment.length;
  const product = productRequest.find(
    (request: any) => request.id === parseInt(id)
  );

  if (!product) {
    return <div>Suggestion not found.</div>;
  }
  return (
    <div className="bg-darkwhite px-[10px] md:px-[24%] py-[90px]  min-h-screen max-w-screen">
      <div className="grid gap-[20px] h-fit">
      <div className="flex justify-between items-center h-fit">
        <Button state={5} title="Go Back" onClick={() => navigate(-1)} />
        <Button
          title="Edit Feedback"
          state={2}
          onClick={() => navigate(`/edit-feedback/${product.id}`)}
        />
      </div>
      <div className="h-fit max-w-screen">
        <SuggestionList
          title={product.title}
          category={product.category}
          upvotes={product.upvotes}
          description={product.description}
          comments={product.comments}
          id={product.id}
        />
      </div>
      <Whitebg className='h-fit max-w-screen'>
        <p className="font-bold text-[18px] text-lightpurple">
          {product.comments?.length || 0} Comments
        </p>

        {product.comments &&
          product.comments.map((val: any, index: any) => (
            <div
              className="flex h-fit  gap-[32px] mt-[28px] relative "
              key={index}
            >
              <div>
                <div className="rounded-full w-[40px] h-[40px] ">
                  <img src={val.user.image} alt={val.user.name} className="rounded-full w-[40px] h-[40px]" />
                </div>
              </div>

              <div className="border-l-[1px] h-[calc(100%-50px)] absolute left-[20px]  border-opacity-50 top-[50px]"></div>

              <div className="w-full">
                <div className="grid gap-[17px] pb-[32px] border-b-[1px]  ">
                  <div className="flex justify-between items-center ">
                    <div className="grid text-[14px] ">
                      <p className="font-bold text-darkpurple">
                        {val.user.name}
                      </p>
                      <p className="text-lightpurple">@{val.user.username}</p>
                    </div>
                    <p
                      className="text-darkblue font-semibold text-[13px] cursor-pointer hover:text-primary"
                      onClick={() => handleReplyClick(val.id)}
                    >
                      Reply
                    </p>
                  </div>

                  <p className="text-grey text-[15px]">{val.content}</p>

                  {selectedCommentId === val.id && (
                    <div className="flex flex-wrap  gap-y-[20px]  items-start">
                      <div className="w-full">
                        <DefaultInput type="textarea" onChange={handleChange}/>
                      </div>
                      <Button
                        title="Post Reply"
                        className="h-fit whitespace-nowrap"
                        state={1}
                        onClick={()=>{addCommentOrReply(product.id,reply,val.id);handleReplyClick(val.id)}}
                      />
                    </div>
                  )}
                </div>
                {val.replies &&
                  val.replies.map((value: any, index: any) => (
                    <div
                      className="flex items-start gap-[32px] mt-[28px] relative bottom-0 left-[-5%] w-full "
                      key={index}
                    >
                      <div>
                        <div className="rounded-full w-[40px] h-[40px] ">
                  <img src={`${val.user.image}`} alt={val.user.name} className="rounded-full w-[40px] h-[40px]" />
                        </div>
                      </div>

                      <div className="grid gap-[17px] pb-[32px]  w-full">
                        <div className="flex justify-between items-center">
                          <div className="grid text-[14px] ">
                            <p className="font-bold text-darkpurple">
                              {value.user.name}
                            </p>
                            <p className="text-lightpurple">
                              @{value.user.username}
                            </p>
                          </div>
                          <p className="text-darkblue font-semibold text-[13px] cursor-pointer hover:text-primary" onClick={() => handleReplyClick(value.id)}>
                            Reply
                          </p>
                        </div>

                        <p className="text-grey text-[15px]">
                          <span className="text-primary font-bold">
                            @{value.replyingTo}
                          </span>{" "}
                          {value.content}
                        </p>
                        {selectedCommentId === value.id && (
                    <div className="flex flex-wrap  gap-y-[20px]  items-start">
                      <div className="w-full">
                        <DefaultInput type="textarea" onChange={handleChange}/>
                      </div>
                      <Button
                        title="Post Reply"
                        className="h-fit whitespace-nowrap"
                        state={1}
                        onClick={()=>{addCommentOrReply(product.id,reply,val.id,value.id);handleReplyClick(value.id)}}
                      />
                    </div>
                  )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </Whitebg>

      <Whitebg className='h-fit'>
        <p className="font-bold text-[18px] text-lightpurple">Add Comment</p>
        <div className="grid  gap-[20px] items-start mt-[24px]">
          <div className="w-full">
            <DefaultInput type="textarea" onChange={handlecommentChange} value={comment} />
          </div>
          <div className="flex items-center justify-between gap-[20px]">
            <p className="text-lightpurple text-[15px]">{remainingChars} characters left</p>
            <Button
              title="Post Comment"
              className="h-fit w-fit whitespace-nowrap"
              state={1}
              onClick={()=>{addCommentOrReply(product.id,comment); setcomment('')}}
            />
          </div>
        </div>
      </Whitebg>

      </div>
    </div>
  );
};

export default FeedbackDetail;
