import { InboxOutlined } from "@ant-design/icons";
import { Form, Radio, Space, Upload, message } from "antd";

const ApplyJobForm = ({
  form,
  onFinish,
  onFinishFailed,
  option,
  setOption,
}) => {
  return (
    <Form
      className="mt-[10px]"
      name="applyForm"
      form={form}
      autoComplete="off"
      onFinish={onFinish}
      layout="vetical"
      onFinishFailed={onFinishFailed}
    >
      <Radio.Group
        onChange={(e) => {
          setOption(e.target.value);
        }}
        value={option}
      >
        <Space direction="vertical">
          <div className="px-[10px] py-4 border-[#d9d9d9] hover:border-[#4096ff] border rounded-lg">
            <Radio value={1}>Select a CV from your collection.</Radio>
          </div>
          <Form.Item
            name="fileCV"
            rules={[
              {
                required: true,
                message: "Please upload your CV!",
                type: "file",
              },
            ]}
          >
            <Upload.Dragger
              beforeUpload={() => false}
              name="file"
              maxCount={1}
              onChange={(info) => {
                const { status } = info.file;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully.`
                  );
                } else if (status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Radio
                value={2}
                onClick={(e) => e.stopPropagation()}
                style={{ position: "absolute", left: 10, top: 5 }}
              ></Radio>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag to upload your CV</p>
              <p className="ant-upload-hint">
                Supports{" "}
                <span className="font-semibold text-gray-700">.doc</span>,{" "}
                <span className="font-semibold text-gray-700">.docx</span>, and{" "}
                <span className="font-semibold text-gray-700">.pdf</span>{" "}
                formats. Please do not upload files containing personal
                sensitive information or files that violate community standards.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Space>
      </Radio.Group>
    </Form>
  );
};

export default ApplyJobForm;
