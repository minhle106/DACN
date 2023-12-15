import { Avatar, Form, Tag, Tooltip, notification } from "antd";
import moment from "moment";
import {
  BigLabel,
  CustomButton,
  CustomDatePicker,
  CustomInput,
  CustomRangePicker,
  CustomSelect,
} from "../../components/StyledComponent";
import { FIELD_OF_WORK, ROLE } from "../../ultils/constant";
import AvatarDefault from "../../assets/images/AvatarDefault.png";
import { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { getUserInfo, updateUserInfo } from "../../stores/reducer/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setUserInfo } from "../../ultils/helpFunc";
import { useSelector } from "react-redux";
import { selectAuth } from "../../stores/reducer/authSlice";

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const isFullInfo = [ROLE.EMPLOYEE, ROLE.STUDENT];
  const { userInfo } = useSelector(selectAuth);

  const { data: userData, fetchStatus: userFetchStatus } = useQuery({
    queryKey: ["userInfo", userInfo],
    queryFn: () => getUserInfo(),
    staleTime: Infinity,
  });
  console.log(userData);
  const { mutate: updateUserInfoMutation } = useMutation({
    mutationFn: (body) => updateUserInfo(body),
  });

  const onFinish = (values) => {
    const body = {
      ...values,
      yearsOfStudy: values?.yearsOfStudy
        ? [
            values?.yearsOfStudy[0].format("YYYY"),
            values?.yearsOfStudy[1].format("YYYY"),
          ]
        : undefined,
      birthDate: values?.birthDate
        ? values?.birthDate.format("YYYY-MM-DD")
        : undefined,
    };
    updateUserInfoMutation(body, {
      onSuccess: () => {
        setIsUpdate(false);
        setUserInfo(body);
        queryClient.invalidateQueries("userInfo");
        notification.success({
          message: "Success",
          description: "Edit profile successfully!",
        });
      },
      onError: (error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <Form
      layout="vertical"
      name="userInfoForm"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="bg-white rounded-lg border shadow px-10 py-10">
        <div className="flex gap-[30px] mb-[50px]">
          <div className="w-[12%] flex justify-center">
            <Avatar size={150} src={AvatarDefault} className="border" />
          </div>
          <div className=" leading-8">
            {isUpdate ? (
              <div className="flex">
                <Form.Item
                  initialValue={userData?.fullName}
                  name="fullName"
                  style={{ margin: 0 }}
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please type your name!",
                    },
                  ]}
                >
                  <CustomInput placeholder="Type your name" />
                </Form.Item>
                <Tooltip title="Edit profile">
                  <div
                    onClick={() => setIsUpdate(!isUpdate)}
                    className="cursor-pointer ms-3 mt-1 hover:text-blue-500 text-xl"
                  >
                    <EditFilled />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <div className="flex items-center font-semibold text-lg">
                {userData?.fullName}
                <Tooltip title="Edit profile">
                  <span
                    onClick={() => setIsUpdate(!isUpdate)}
                    className="cursor-pointer ms-3 hover:text-blue-500"
                  >
                    <EditFilled />
                  </span>
                </Tooltip>
              </div>
            )}

            {userData?.roles.some((role) => isFullInfo.includes(role)) &&
              (isUpdate ? (
                <Form.Item
                  initialValue={userData?.jobTitle}
                  name="jobTitle"
                  style={{ marginTop: 15, marginBottom: 0 }}
                >
                  <CustomInput placeholder="Type your job title" />
                </Form.Item>
              ) : (
                <div className="pt-5 pb-4">
                  <span className="px-3 py-3 bg-blue-100 rounded-lg text-blue-500 font-semibold">
                    {userData?.jobTitle}
                  </span>
                </div>
              ))}

            {userData?.roles.some((role) => isFullInfo.includes(role)) &&
              (isUpdate ? (
                <Form.Item
                  name="fieldOfWork"
                  initialValue={userData?.fieldOfWork}
                >
                  <CustomSelect
                    mode="multiple"
                    placeholder="Select your field of work"
                    maxTagCount={3}
                    style={{ marginTop: 15 }}
                  >
                    {FIELD_OF_WORK?.map((item) => (
                      <CustomSelect.Option value={item} key={item}>
                        {item}
                      </CustomSelect.Option>
                    ))}
                  </CustomSelect>
                </Form.Item>
              ) : (
                <div className="flex items-center">
                  <BigLabel className="me-4">Field of work: </BigLabel>
                  {userData?.fieldOfWork?.map((item) => (
                    <Tag color="geekblue">{item}</Tag>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div
          className="flex gap-[20px]"
          style={{ marginBottom: !isUpdate ? "21px" : "" }}
        >
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                label={<BigLabel>Day of birth: </BigLabel>}
                name="birthDate"
              >
                <CustomDatePicker placeholder="Select your birthday" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>Day of birth: </BigLabel>
                <div className="py-3 font-medium">
                  {userData?.birthDate &&
                    moment(new Date(userData?.birthDate)).format("DD/MM/YYYY")}
                </div>
              </>
            )}
          </div>
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userData?.sex}
                label={<BigLabel>Gender: </BigLabel>}
                name="sex"
              >
                <CustomSelect placeholder="Select your gender">
                  <CustomSelect.Option value={"Male"} key={"Male"}>
                    Male
                  </CustomSelect.Option>
                  <CustomSelect.Option value={"Female"} key={"Female"}>
                    Female
                  </CustomSelect.Option>
                </CustomSelect>
              </Form.Item>
            ) : (
              <>
                <BigLabel>Gender: </BigLabel>
                <div className="py-3 font-medium">{userData?.sex}</div>
              </>
            )}
          </div>
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userData?.phone}
                label={<BigLabel>Phone: </BigLabel>}
                name="phone"
              >
                <CustomInput placeholder="Type your phone" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>Phone: </BigLabel>
                <div className="py-3 font-medium">{userData?.phone}</div>
              </>
            )}
          </div>
          <div className="w-3/12">
            <BigLabel>Email: </BigLabel>
            <div className="py-3 font-medium">{userData?.email}</div>
          </div>
        </div>

        <div className="flex gap-[20px]">
          {!userData?.roles.some((role) => isFullInfo.includes(role)) && (
            <>
              <div className="w-3/12">
                {isUpdate ? (
                  <Form.Item
                    initialValue={userData?.city}
                    label={<BigLabel>City: </BigLabel>}
                    name="city"
                  >
                    <CustomInput placeholder="Type your city" />
                  </Form.Item>
                ) : (
                  <>
                    <BigLabel>City: </BigLabel>
                    <div className="py-3 font-medium">{userData?.city}</div>
                  </>
                )}
              </div>
              <div className="w-3/12">
                {isUpdate ? (
                  <Form.Item
                    initialValue={userData?.country}
                    label={<BigLabel>Country: </BigLabel>}
                    name="country"
                  >
                    <CustomInput placeholder="Type your country" />
                  </Form.Item>
                ) : (
                  <>
                    <BigLabel>Country: </BigLabel>
                    <div className="py-3 font-medium">{userData?.country}</div>
                  </>
                )}
              </div>
              <div className="w-3/12"></div> <div className="w-3/12"></div>
            </>
          )}

          {userData?.roles.some((role) => isFullInfo.includes(role)) && (
            <div className="w-3/12">
              {isUpdate ? (
                <Form.Item
                  label={<BigLabel>School/University: </BigLabel>}
                  name="schoolName"
                  initialValue={userData?.schoolName}
                >
                  <CustomInput placeholder="Type your school/university" />
                </Form.Item>
              ) : (
                <>
                  <BigLabel>School/University: </BigLabel>
                  <div className="py-3 font-medium">{userData?.schoolName}</div>
                </>
              )}
            </div>
          )}

          {userData?.roles.some((role) => isFullInfo.includes(role)) && (
            <div className="w-3/12">
              {isUpdate ? (
                <Form.Item
                  label={<BigLabel>Years of study: </BigLabel>}
                  name="yearsOfStudy"
                >
                  <CustomRangePicker picker="year" />
                </Form.Item>
              ) : (
                <>
                  <BigLabel>Years of study:</BigLabel>
                  <div className="py-3 font-medium">
                    {userData?.yearsOfStudy?.[0]}-{userData?.yearsOfStudy?.[1]}
                  </div>
                </>
              )}
            </div>
          )}

          {userData?.roles.some((role) => isFullInfo.includes(role)) && (
            <>
              <div className="w-3/12">
                {isUpdate ? (
                  <Form.Item
                    initialValue={userData?.city}
                    label={<BigLabel>City: </BigLabel>}
                    name="city"
                  >
                    <CustomInput placeholder="Type your city" />
                  </Form.Item>
                ) : (
                  <>
                    <BigLabel>City: </BigLabel>
                    <div className="py-3 font-medium">{userData?.city}</div>
                  </>
                )}
              </div>
              <div className="w-3/12">
                {isUpdate ? (
                  <Form.Item
                    initialValue={userData?.country}
                    label={<BigLabel>Country: </BigLabel>}
                    name="country"
                  >
                    <CustomInput placeholder="Type your country" />
                  </Form.Item>
                ) : (
                  <>
                    <BigLabel>Country: </BigLabel>
                    <div className="py-3 font-medium">{userData?.country}</div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {isUpdate && (
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium"
            >
              Edit Profile
            </CustomButton>
          </div>
        )}
      </div>
    </Form>
  );
};

export default Profile;
