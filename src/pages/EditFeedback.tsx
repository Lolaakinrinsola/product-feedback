import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import DefaultInput from "../components/DefaultInput";
import Whitebg from "../components/Whitebg";
import { FaPenNib } from "react-icons/fa";
import { useState } from "react";
import useStore from "../utils/Store";
import Dropdown from "../components/Dropdown";

const EditFeedback = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const {
    productRequest,
    board,
    status,
    deleteProductRequest,
    updateProductRequest,
  } = useStore();
  const product = productRequest.find(
    (request: any) => request.id === parseInt(id)
  );

  const [state, setstate] = useState({
    title: product.title,
    description: product.description,
  });
  const { title, description } = state;

  function handleChange(e: any) {
    setstate((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  }

  const category =
    product && product.category
      ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
      : "";

  const statusOption =
    product && product.status
      ? product.status.charAt(0).toUpperCase() + product.status.slice(1)
      : "";
  const [value, setvalue] = useState(category);
  const [statusValue, setstatusValue] = useState(statusOption);

  function handleSubmit() {
    updateProductRequest(product.id, {
      title,
      description,
      category: value,
      status: statusValue,
    });
    navigate("/");
  }

  if (!product) {
    return <div>Comment not found.</div>;
  }
  return (
    <div className="bg-darkwhite px-[10px] md:px-[30%] py-[30px]  md:py-[90px] grid gap-[20px] min-h-screen">
      <div className="h-fit grid gap-[68px]">
        <Button
          state={5}
          title="Go Back"
          onClick={() => navigate(-1)}
          className="w-fit h-fit"
        />

        <Whitebg className="relative md:!px-[42px]">
          <div className="w-[56px] h-[56px] rounded-full bg-custom-radial grid justify-center text-white text-[25px] absolute top-[-5%]">
            <FaPenNib className="m-auto" />
          </div>

          <div className="grid gap-[24px] mt-[40px]">
            <p className="font-bold text-[24px] text-lightpurple mb-[20px]">
              Editing '{product.title}'
            </p>

            <DefaultInput
              type="text"
              label="Feedback Title"
              caption="Add a short, descriptive headline"
              value={title}
              name="title"
              onChange={handleChange}
            />
            <Dropdown
              label="Category"
              caption="Choose a category for your feedback"
              options={board}
              value={value}
              setValue={setvalue}
            />
            <Dropdown
              label="Update Status"
              caption="Change feedback state"
              options={status}
              value={statusValue}
              setValue={setstatusValue}
            />
            <DefaultInput
              type="textarea"
              label="Feedback Detail"
              caption="Include any specific comments on what should be improved, added, etc."
              value={description}
              name="description"
              onChange={handleChange}
            />

            <div className="grid md:flex gap-y-[20px] md:flex-wrap md:justify-between w-full">
              <Button
                title="Delete"
                state={4}
                className="md:w-fit justify-center grid h-fit w-[100%]"
                onClick={() => {
                  deleteProductRequest(product.id);
                  navigate("/");
                }}
              />

              <div className="grid md:flex flex-wrap gap-[20px]">
                <Button
                  title="Cancel"
                  state={3}
                  className="md:w-fit justify-center text-center grid h-fit"
                  onClick={() => navigate(`/feedback/${product.id}`)}
                />
                <Button
                  title="Add Feedback"
                  state={1}
                  className="md:w-fit justify-center text-center grid h-fit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </Whitebg>
      </div>
    </div>
  );
};

export default EditFeedback;
