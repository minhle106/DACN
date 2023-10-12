import styled from "styled-components";
import { DatePicker, Input } from "antd";

const GeneralInput = styled(Input)`
  border: 1px solid rgb(0 0 0);
  border-radius: 4px;
  padding: 1rem;
`;

const PasswordInput = styled(Input.Password)`
  border: 1px solid rgb(0 0 0);
  border-radius: 4px;
  padding: 1rem;
`;

const AddItemButton = styled.div`
  padding: 0 6px 0 6px;
  border-radius: 4px;
  border: 1px solid black;
  &:hover {
    border-color: #4096ff;
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  justify-content: center;
`;

const CustomLabel = styled.label`
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
  font-size: 1rem !important;
`;

const CustomDatePicker = styled(DatePicker.RangePicker)`
  border: 1px solid rgb(0 0 0);
  border-radius: 4px;
  padding: 1rem;
  width: 100%;
`;

export {
  GeneralInput,
  PasswordInput,
  AddItemButton,
  CustomLabel,
  CustomDatePicker,
};
