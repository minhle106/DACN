import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ModalNotification = ({ onOK, content, okText, title, width }) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    onOk: onOK,
    onCancel() {},
    cancelButtonProps: {
      style: {
        background: "black",
        color: "white",
      },
      className: "hover:!bg-[#3b3b3b] hover:!border-black border-black",
    },
    okButtonProps: {
      style: {
        color: "white",
      },
      className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
    },
    okText: okText,
    width: width,
  });
};

export default ModalNotification;
