import { DatePicker, Form, Input, Radio, Select } from "antd";
import { getAffiliations, getRoles } from "../stores/reducer/authSettingSlice";
import { useQuery } from "@tanstack/react-query";
import { GENDER, STATUS } from "../ultils/constant";
import { FormSelect } from "./StyledComponent";

const CreateEmployeeForm = ({ form }) => {
  const page = 1;
  const size = 10;
  const { data: roleData } = useQuery({
    queryKey: ["roles", page, size],
    queryFn: () => getRoles({ page: page, size: size }),
  });

  const { data: affiliationData } = useQuery({
    queryKey: ["affiliations", page, size],
    queryFn: () => getAffiliations({ page: page, size: size }),
  });

  return (
    <Form
      name="employeeForm"
      form={form}
      layout={"vertical"}
      autoComplete="off"
      onFinish={() => {}}
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
            type: "email",
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
        name="roleId"
        rules={[
          {
            required: true,
            message: "Please select your role!",
          },
        ]}
      >
        <FormSelect size="large" listHeight={400}>
          {roleData?.listContent?.map((item) => (
            <Select.Option value={item.roleId} key={item.roleId}>
              {item.roleName}
            </Select.Option>
          ))}
        </FormSelect>
      </Form.Item>
      <Form.Item
        label="Affiliation"
        name="affiliationId"
        rules={[
          {
            required: true,
            message: "Please select your affiliation!",
          },
        ]}
      >
        <FormSelect size="large" listHeight={400}>
          {affiliationData?.listContent?.map((item) => (
            <Select.Option value={item.affiliationId} key={item.affiliationId}>
              {item.affiliationName}
            </Select.Option>
          ))}
        </FormSelect>
      </Form.Item>
      <Form.Item
        label="Gender"
        name="sex"
        initialValue={GENDER.MALE}
        rules={[
          {
            required: true,
            message: "Please select your gender!",
          },
        ]}
      >
        <Radio.Group name="sex">
          <Radio value={GENDER.MALE}>Male</Radio>
          <Radio value={GENDER.FEMALE}>Female</Radio>
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

export default CreateEmployeeForm;
