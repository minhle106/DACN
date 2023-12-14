import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ModalNotification = ({ onOK, content, okText, title, width }) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined style={{ color: "blue" }} />,
    content: content,
    onOk: onOK,
    onCancel() {},
    cancelButtonProps: {
      style: {
        background: "black",
        color: "white",
      },
      className: "hover:!bg-[#242424] hover:!border-black border-black",
    },
    okButtonProps: {
      style: {
        background: "blue",
        color: "white",
      },
    },
    okText: okText,
    width: width,
  });
};

export default ModalNotification;
