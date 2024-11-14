import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DefaultInput from "../components/DefaultInput";
import Whitebg from "../components/Whitebg";
import { FaPlus } from "react-icons/fa";
import useStore from "../utils/Store";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const NewFeedback = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState("");
  const { board, addProductRequest } = useStore();
  const [state, setstate] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
  });
  const { title, description } = state;
  function handleChange(e: any) {
    setstate((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));

    // Clear the error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  }

  function validateForm() {
    const newErrors: any = {};
    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }
    if (description.trim() === "") {
      newErrors.description = "Description is required";
    }
    if (value === "") {
      newErrors.category = "Category is required";
    }
    return newErrors;
  }

  function handleSubmit() {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // If there are validation errors, update the error state
      setErrors(formErrors);
      return; // Prevent form submission
    }

    addProductRequest({
      title,
      description,
      category: value,
    });
    navigate("/");
  }
  console.log(board, "the board");

  return (
    <div className="bg-darkwhite px-[20px] md:px-[10%] lg:px-[30%] py-[90px] grid gap-[20px] min-h-screen">
      <div className="h-fit grid gap-[68px]">
        <Button
          state={5}
          title="Go Back"
          onClick={() => navigate(-1)}
          className="w-fit h-fit"
        />

        <Whitebg className="relative md:!px-[42px]">
          <div className="w-[56px] h-[56px] rounded-full bg-custom-radial grid justify-center text-white text-[25px] absolute top-[-5%]">
            <FaPlus className="m-auto" />
          </div>

          <div className="grid gap-[24px] mt-[40px]">
            <p className="font-bold text-[24px] text-lightpurple mb-[20px]">
              Create New Feedback
            </p>

            <DefaultInput
              type="text"
              label="Feedback Title"
              caption="Add a short, descriptive headline"
              name="title"
              value={title}
              onChange={handleChange}
              error={errors.title}
            />
            <Dropdown
              label="Category"
              caption="Choose a category for your feedback"
              options={board}
              value={value}
              setValue={setvalue}
              error={errors.category}
            />
            <DefaultInput
              type="textarea"
              label="Feedback Detail"
              caption="Include any specific comments on what should be improved, added, etc."
              name="description"
              value={description}
              onChange={handleChange}
              error={errors.description}
            />

            <div className="grid md:flex md:justify-end gap-[20px]">
              <Button
                title="Cancel"
                state={3}
                className="md:w-fit justify-center text-center grid"
                onClick={() => navigate("/")}
              />
              <Button
                title="Add Feedback"
                state={1}
                className="md:w-fit justify-center text-center grid"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </Whitebg>
      </div>
    </div>
  );
};

export default NewFeedback;
