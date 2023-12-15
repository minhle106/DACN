import { useState } from "react";
import {
  BigLabel,
  CustomDatePicker,
  CustomInput,
  CustomPagination,
  CustomTable,
} from "../../components/StyledComponent";
import moment from "moment";
import { Avatar, Form, Input, Modal, Tooltip, notification } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  addNotes,
  createMeeting,
  getCandidates,
  toEvaluationCandidate,
} from "../../stores/reducer/candidateSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalNotification from "../../components/ModalNotification";

const Interview = () => {
  const [noteForm] = Form.useForm();
  const [meetingForm] = Form.useForm();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [isOpenMeeting, setIsOpenMeeting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState();
  const [record, setRecord] = useState();

  const queryClient = useQueryClient();

  const { data: candidateData, fetchStatus: candidateFetchStatus } = useQuery({
    queryKey: ["Interview", page, size],
    queryFn: () =>
      getCandidates({ page: page, size: size, status: "Interview" }),
    staleTime: Infinity,
  });

  const { mutate: toInterviewCandidateMutation } = useMutation({
    mutationFn: (params) => toEvaluationCandidate(params),
  });

  const { mutate: addNotesMutation } = useMutation({
    mutationFn: (body) => addNotes(body),
  });

  const { mutate: createMeetingMutation } = useMutation({
    mutationFn: (body) => createMeeting(body),
  });

  const toEvaluation = (id) => {
    ModalNotification({
      onOK: () => {
        toInterviewCandidateMutation(id, {
          onSuccess: () => {
            queryClient.invalidateQueries("Interview");
            notification.success({
              message: "Success",
              description: "Interview candidate successfully!",
            });
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: error.message,
            });
          },
        });
      },
      content: "Do you want to evaluate this candidate?",
      okText: "To evaluation",
      title: "Confirm",
      width: 500,
    });
  };

  const handleAddNotes = (values) => {
    addNotesMutation(
      {
        cvApplyId: activeKey,
        note: values.note,
      },
      {
        onSuccess: () => {
          setIsOpenNote(false);
          noteForm.resetFields();
          queryClient.invalidateQueries("Interview");
          notification.success({
            message: "Success",
            description: "Add notes successfully!",
          });
        },
        onError: (error) => {
          notification.error({
            message: "Error",
            description: error.message,
          });
        },
      }
    );
  };

  const handleCreateMeeting = (values) => {
    createMeetingMutation(
      {
        cvApplyId: activeKey,
        linkMeeting: values.linkMeeting,
        dateInterview: moment(new Date(values.dateInterview)).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
      },
      {
        onSuccess: () => {
          setIsOpenMeeting(false);
          meetingForm.resetFields();
          queryClient.invalidateQueries("Interview");
          notification.success({
            message: "Success",
            description: "Create meeting successfully!",
          });
        },
        onError: (error) => {
          notification.error({
            message: "Error",
            description: error.message,
          });
        },
      }
    );
  };

  const onChangePagination = (page, size) => {
    setPage(page);
    setSize(size);
  };

  const tableData = candidateData?.listContent?.map((item) => ({
    key: item.idCVApply,
    job: {
      jobTitle: item.jobName,
      jobRelease: item.dateRelease,
      jobExpire: item.dateExpire,
    },
    candidate: {
      fullName: item.candidateName,
      linkAvatar: item.linkAvatar,
      linkCV: item.linkCV,
    },
    contact: {
      email: item.email,
      phone: item.phone,
    },
    interviewDate: item.dateInterview === null ? undefined : item.dateInterview,
    note: item.note,
    action: {
      isMeeting: item.dateInterview === null ? false : true,
    },
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1 + (page - 1) * size,
      fixed: "left",
      width: "5%",
    },
    {
      title: "Job Title",
      dataIndex: "job",
      key: "job",
      fixed: "left",
      render: (job) => {
        const release = moment(new Date(job.jobRelease)).format("DD-MM-YY");
        const expire = moment(new Date(job.jobExpire)).format("DD-MM-YY");

        return (
          <>
            <div className="font-medium">{job.jobTitle}</div>
            <div className=" text-sm">
              {release}/{expire}
            </div>
          </>
        );
      },
    },
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
      fixed: "left",
      render: (candidate) => (
        <div className="flex items-center gap-[10px]">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{candidate.fullName}</div>
            <div className="text-blue-600 hover:text-blue-800 underline">
              Link CV
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (contact) => (
        <>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
        </>
      ),
    },
    {
      title: "Interview",
      dataIndex: "interviewDate",
      key: "interviewDate",
      render: (text, record) => {
        if (text) {
          const time = moment(new Date(text)).format("DD/MM/YYYY");
          return (
            <div className="flex gap-[10px]">
              <div>{time}</div>
              <Tooltip title="Interview information">
                <EyeOutlined
                  onClick={() => {
                    setIsOpen(true);
                    setRecord(record);
                  }}
                />
              </Tooltip>
            </div>
          );
        }
      },
      width: "120px",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (text, record) => {
        return (
          <Tooltip title="Add notes">
            <EditOutlined
              onClick={() => {
                noteForm.setFieldValue("note", text);
                setActiveKey(record.key);
                setIsOpenNote(true);
              }}
              style={{ fontSize: 16 }}
            />
          </Tooltip>
        );
      },
      width: "80px",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (action, record) => {
        return (
          <div className="flex gap-[10px] justify-center">
            {!action.isMeeting ? (
              <div
                onClick={() => {
                  meetingForm.setFieldValue(
                    "candidateName",
                    record.candidate.fullName
                  );

                  setActiveKey(record.key);
                  setIsOpenMeeting(true);
                }}
                className="px-4 py-1 border hover:border-blue-400 rounded bg-white"
              >
                <div className="flex items-center">
                  <PlusCircleOutlined
                    className="me-2"
                    style={{ color: "green", fontSize: 16 }}
                  />
                  <div>Create meeting</div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => toEvaluation(record.key)}
                className="px-4 py-1 border hover:border-blue-400 rounded bg-white"
              >
                <div className="flex items-center">
                  <CheckCircleOutlined
                    className="me-2"
                    style={{ color: "green", fontSize: 16 }}
                  />
                  <div>To evaluation</div>
                </div>
              </div>
            )}
          </div>
        );
      },
      width: "17%",
    },
  ];

  return (
    <>
      <Modal
        title={
          <div className="font-medium text-xl mb-[20px]">
            Add notes to the interview
          </div>
        }
        open={isOpenNote}
        onOk={() => {
          noteForm.submit();
        }}
        onCancel={() => {
          setIsOpenNote(false);
          noteForm.resetFields();
        }}
        width={500}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Add note"
        okButtonProps={{
          style: {
            color: "white",
          },
          className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
        }}
      >
        <Form
          form={noteForm}
          name="noteForm"
          onFinish={(values) => handleAddNotes(values)}
          autoComplete="off"
        >
          <Form.Item name="note">
            <Input.TextArea
              rows={8}
              placeholder="Type your notes..."
              maxLength={400}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="font-medium text-xl mb-[20px]">
            Create meeting room for the interview
          </div>
        }
        open={isOpenMeeting}
        onOk={() => {
          meetingForm.submit();
        }}
        onCancel={() => {
          setIsOpenMeeting(false);
          meetingForm.resetFields();
        }}
        width={500}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Create Meeting"
        okButtonProps={{
          style: {
            color: "white",
          },
          className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
        }}
      >
        <Form
          form={meetingForm}
          name="meetingForm"
          onFinish={(values) => handleCreateMeeting(values)}
          autoComplete="off"
        >
          <Form.Item
            name="candidateName"
            label={<BigLabel>Candidate name: </BigLabel>}
            required={true}
          >
            <CustomInput disabled />
          </Form.Item>
          <Form.Item
            name="linkMeeting"
            label={<BigLabel>Link meeting room: </BigLabel>}
            rules={[
              {
                required: true,
                message: "Please paste your link meeting room!",
              },
            ]}
          >
            <CustomInput placeholder="Paste your link meeting room" />
          </Form.Item>
          <Form.Item
            name="dateInterview"
            label={<BigLabel>Interview date: </BigLabel>}
            rules={[
              {
                required: true,
                message: "Please select the interview date!",
              },
            ]}
          >
            <CustomDatePicker
              showTime={{ format: "HH:mm" }}
              placeholder="Select the interview date"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="font-medium text-xl mb-[20px]">
            Meeting room information
          </div>
        }
        open={isOpen}
        onOk={() => {
          setIsOpen(false);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        width={500}
        cancelButtonProps={{
          style: {
            background: "black",
            color: "white",
            display: "none",
          },
          className: "hover:!bg-[#242424] hover:!border-black border-black",
        }}
        okText="Close"
        okButtonProps={{
          style: {
            color: "white",
          },
          className: "bg-blue-600 hover:!bg-blue-800 border-blue-700",
        }}
      >
        <div>
          Candidate:{" "}
          <span className="font-semibold">{record?.candidate.fullName}</span>
        </div>
        <div>
          Link meeting room:{" "}
          <span className="font-semibold">{record?.linkMeeting}</span>
        </div>
        <div>
          Interview date:{" "}
          <span className="font-semibold">
            {moment(new Date(record?.interviewDate)).format("HH:mm DD/MM/YYYY")}
          </span>
        </div>
        <div>
          Notes: <span className="font-semibold">{record?.note}</span>
        </div>
      </Modal>

      <CustomTable
        // loading={jobFetchStatus === STATUS.FETCHING}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: `calc(100vh - 365px)` }}
        onRow={() => {}}
      />

      <CustomPagination
        //  total={jobData?.totalElement}
        total={tableData?.length}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={size}
        current={page}
        onChange={onChangePagination}
        showSizeChanger
      />
    </>
  );
};

export default Interview;
