import { useSelector } from "react-redux";
import { selectAuth } from "../../stores/reducer/authSlice";
import { Avatar, Form } from "antd";
import moment from "moment";
import {
  BigLabel,
  CustomDatePicker,
  CustomInput,
  CustomSelect,
} from "../../components/StyledComponent";
import { ROLE } from "../../ultils/constant";
import AvatarDefault from "../../assets/images/AvatarDefault.png";
import { useState } from "react";
import { EditFilled } from "@ant-design/icons";

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { userInfo } = useSelector(selectAuth);
  console.log(userInfo);
  const isFullInfo = [ROLE.EMPLOYEE, ROLE.STUDENT];

  return (
    <Form
      layout="vertical"
      name="userInfoForm"
      autoComplete="off"
      onFinish={(values) => console.log(values)}
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
                  initialValue={userInfo?.fullName}
                  name="fullName"
                  style={{ margin: 0 }}
                >
                  <CustomInput placeholder="Type your name" />
                </Form.Item>
                <div
                  onClick={() => setIsUpdate(!isUpdate)}
                  className="cursor-pointer ms-3 mt-1 hover:text-blue-500 text-xl"
                >
                  <EditFilled />
                </div>
              </div>
            ) : (
              <div className="flex items-center font-semibold text-lg">
                {userInfo?.fullName}
                <span
                  onClick={() => setIsUpdate(!isUpdate)}
                  className="cursor-pointer ms-3 hover:text-blue-500"
                >
                  <EditFilled />
                </span>
              </div>
            )}
            {userInfo?.roles.some((role) => isFullInfo.includes(role)) && (
              <>
                <div className="pt-5 pb-4">
                  <span className="px-3 py-3 bg-blue-100 rounded-lg text-blue-500 font-semibold">
                    {userInfo?.jobTitle}
                  </span>
                </div>
              </>
            )}
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
                initialValue={moment(new Date())}
              >
                <CustomDatePicker placeholder="Select your birthday" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>Day of birth: </BigLabel>
                <div className="py-3 font-medium">
                  {userInfo?.birthDate &&
                    moment(new Date(userInfo?.birthDate)).format("DD/MM/YYYY")}
                </div>
              </>
            )}
          </div>
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userInfo?.sex}
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
                <div className="py-3 font-medium">{userInfo?.sex}</div>
              </>
            )}

            {/*   <BigSelect
                  placeholder="Choose your number of employees"
                  onChange={(value) => {
                    form.setFieldValue(["numberOfEmployees"], value);
                  }}
                >
                  {QUANTITY_EMPLOYEE.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </BigSelect> */}
          </div>
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userInfo?.phone}
                label={<BigLabel>Phone: </BigLabel>}
                name="phone"
              >
                <CustomInput placeholder="Type your phone" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>Phone: </BigLabel>
                <div className="py-3 font-medium">{userInfo?.phone}</div>
              </>
            )}
          </div>
          <div className="w-3/12">
            <BigLabel>Email: </BigLabel>
            <div className="py-3 font-medium">{userInfo?.email}</div>
          </div>
        </div>

        <div className="flex gap-[20px]">
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userInfo?.city}
                label={<BigLabel>City: </BigLabel>}
                name="city"
              >
                <CustomInput placeholder="Type your city" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>City: </BigLabel>
                <div className="py-3 font-medium">{userInfo?.city}</div>
              </>
            )}
          </div>
          <div className="w-3/12">
            {isUpdate ? (
              <Form.Item
                initialValue={userInfo?.country}
                label={<BigLabel>Country: </BigLabel>}
                name="country"
              >
                <CustomInput placeholder="Type your country" />
              </Form.Item>
            ) : (
              <>
                <BigLabel>Country: </BigLabel>
                <div className="py-3 font-medium">{userInfo?.country}</div>
              </>
            )}
          </div>
          <div className="w-3/12">
            {/* <Form.Item
              label={<BigLabel>Day of birth: </BigLabel>}
              name="birthDate"
            >
              <CustomDatePicker />
            </Form.Item> */}
          </div>
          <div className="w-3/12">
            {/* <Form.Item label={<BigLabel>Gender: </BigLabel>} name="sex">
              <CustomSelect placeholder="Select your gender">
                <CustomSelect.Option value={"Male"} key={"Male"}>
                  Male
                </CustomSelect.Option>
                <CustomSelect.Option value={"Female"} key={"Male"}>
                  Female
                </CustomSelect.Option>
              </CustomSelect>
            
            </Form.Item> */}
          </div>
          {/*   <div className="w-3/12">
            <Form.Item label={<BigLabel>City: </BigLabel>} name="city">
              <CustomInput placeholder="Type your city" />
            </Form.Item>
          </div>
          <div className="w-3/12">
            <Form.Item label={<BigLabel>Country: </BigLabel>} name="country">
              <CustomInput placeholder="Type your country" />
            </Form.Item>
          </div> */}
        </div>
      </div>
    </Form>
  );
};

export default Profile;
