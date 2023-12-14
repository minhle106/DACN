import { DatePicker, Form, Input, Radio, Select } from "antd";
import {
  getAllAffiliations,
  getAllRoles,
} from "../../stores/reducer/authSettingSlice";
import { useQuery } from "@tanstack/react-query";
import { FormSelect } from "../../components/StyledComponent";

const EmployeeForm = ({ form, onFinish }) => {
  const { data: roleData } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getAllRoles(),
  });

  const { data: affiliationData } = useQuery({
    queryKey: ["affiliations"],
    queryFn: () => getAllAffiliations(),
  });

  return (
    <Form
      name="employeeForm"
      onFinish={onFinish}
      form={form}
      layout={"vertical"}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input style={{ borderRadius: 5 }} size={"large"} name="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          style={{ borderRadius: 5 }}
          size={"large"}
          name="password"
        />
      </Form.Item>

      <Form.Item
        label="Full name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your full name!",
          },
        ]}
      >
        <Input style={{ borderRadius: 5 }} size={"large"} name="fullName" />
      </Form.Item>

      <Form.Item
        label="Role"
        name="roleName"
        rules={[
          {
            required: true,
            message: "Please select your role!",
          },
        ]}
      >
        <FormSelect size="large" listHeight={250}>
          {roleData?.listContent?.map((item) => (
            <Select.Option value={item.roleName} key={item.roleName}>
              {item.roleName}
            </Select.Option>
          ))}
        </FormSelect>
      </Form.Item>
      <Form.Item
        label="Affiliation"
        name="affiliationName"
        rules={[
          {
            required: true,
            message: "Please select your affiliation!",
          },
        ]}
      >
        <FormSelect size="large" listHeight={250}>
          {affiliationData?.listContent?.map((item) => (
            <Select.Option
              value={item.affiliationName}
              key={item.affiliationName}
            >
              {item.affiliationName}
            </Select.Option>
          ))}
        </FormSelect>
      </Form.Item>
      <Form.Item
        label="Day of birth"
        name="dob"
        rules={[
          {
            required: true,
            message: "Please select day of birth!",
          },
        ]}
      >
        <DatePicker name="dob" style={{ width: "100%" }} size={"large"} />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        initialValue="Male"
        rules={[
          {
            required: true,
            message: "Please select your gender!",
          },
        ]}
      >
        <Radio.Group name="gender">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Joined At"
        name="joinAt"
        rules={[
          {
            required: true,
            message: "Please select joinedAt!",
          },
        ]}
      >
        <DatePicker name="joinAt" style={{ width: "100%" }} size={"large"} />
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
