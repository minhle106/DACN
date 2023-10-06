import styled from "styled-components";
import { Input } from "antd";
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
const SelectInput = styled.select`
  border: 1px solid rgb(0 0 0);
  border-radius: 4px;
  padding: 1rem;
  display: block;
  width: 100%;
  &:hover {
    border-color: #4096ff;
  }
  &:focus {
    border-color: #4096ff;
  }
  appearance: none;
`;
const OptionInput = styled.option`
  color: black;
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
export { GeneralInput, PasswordInput, SelectInput, OptionInput, AddItemButton };
