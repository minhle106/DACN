import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ModalConfirmDelete = ({ onOK, content }) => {
  Modal.confirm({
    title: "Confirm",
    icon: <ExclamationCircleOutlined />,
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
      danger: true,
    },
    okText: "Delete",
  });
};

export default ModalConfirmDelete;
