import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "./StyledComponent";

const AddButton = ({ onClick, text }) => {
  return (
    <CustomButton
      onClick={onClick}
      className="flex items-center text-white font-semibold bg-[#8f83ae] 
  hover:bg-white hover:text-[#8f83ae] border-[#8f83ae] "
    >
      <PlusCircleOutlined className="text-lg me-2" />
      <div>{text}</div>
    </CustomButton>
  );
};

export default AddButton;
