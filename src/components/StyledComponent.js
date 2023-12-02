import styled from "styled-components";
import {
  DatePicker,
  Input,
  Menu,
  Select,
  Steps,
  Pagination,
  Table,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//----------------------------------------------------
/* LOGIN SIGNUP */

export const BigInput = styled(Input)`
  border: 1px solid #c3c3c3 !important;
  border-radius: 4px;
  padding: 1rem;
`;

export const BigPasswordInput = styled(Input.Password)`
  border: 1px solid #c3c3c3 !important;
  border-radius: 4px;
  padding: 1rem;
`;

export const AddItemButton = styled.div`
  padding: 0 6px 0 6px;
  border-radius: 4px;
  border: 1px solid #c3c3c3;
  &:hover {
    border-color: #4096ff;
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  justify-content: center;
`;

export const BigLabel = styled.label`
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
  font-size: 1rem !important;
`;

export const BigRangePicker = styled(DatePicker.RangePicker)`
  border: 1px solid #c3c3c3 !important;
  border-radius: 4px;
  padding: 1rem;
  width: 100%;
`;

export const BigSelect = styled(Select)`
  .ant-select-dropdown .ant-select-item-option-content {
    padding: 10px;
  }

  border-radius: 4px;

  & .ant-select-selector {
    border: 1px solid #c3c3c3 !important;
    min-height: 3.75rem !important;
  }

  & span.ant-select-selection-placeholder {
    text-align: left;
    margin-left: 5px;
  }

  & span.ant-select-selection-item {
    text-align: left !important;
    padding-left: 0.25rem !important;
    background: white !important;
  }

  & .ant-select-arrow {
    top: 50% !important;
    inset-inline-end: 16px !important;
  }
`;

//----------------------------------------------------
/* FORM */

export const FormSelect = styled(Select)`
  & .ant-select-selector {
    border-radius: 5px !important;
  }
`;

export const FormMultipleSelect = styled(Select)`
  & .ant-select-selector {
    border-radius: 5px !important;
  }
  & span.ant-select-selection-item {
    background: #f9f0ff !important;
    color: #531dab !important;
    border-color: #d3adf7 !important;
  }
`;

//----------------------------------------------------
/* GENERAL */

export const MenuDashboard = styled(Menu)`
  & li.ant-menu-item.ant-menu-item-selected {
    background-color: #3b3a48;
    color: #8f83ae;
    font-weight: 700;
  }
  & .ant-menu-submenu-title {
    color: white !important;
  }
  & .ant-menu-item-active {
    color: #8f83ae !important;
    background-color: #4a4658 !important;
  }
`;

export const CustomSteps = styled(Steps)`
  & .ant-steps-item-title {
    font-size: 1.25rem;
  }
  & .ant-steps-item-description {
    font-size: 0.9rem;
  }
`;

export const CustomButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #d9d9d9;
  transition: all 0.3s ease;
`;

export const CustomTable = styled(Table)`
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;

  & span.ant-select-arrow {
    display: none !important;
  }

  & .ant-table-container {
    border-radius: 0px !important;
  }
  & .ant-table-header {
    border-radius: 0px !important;
  }
  & td.ant-table-cell {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    border-bottom: 1px solid #d9d9d9 !important;
  }

  & th.ant-table-cell {
    background-color: #ebeefb !important;
    padding: 15px !important;
    color: #646368 !important;
    font-weight: 500 !important;
    border-bottom: 1px solid #d9d9d9 !important;
    height: 21px !important;
    max-height: 21px !important;
  }
  & td.ant-table-cell-row-hover {
    background-color: #fff4e8 !important;
    cursor: pointer;
  }

  & th.ant-table-cell:first-child {
    border-start-start-radius: 0px !important;
  }

  & th.ant-table-cell:last-child {
    border-start-end-radius: 0px !important;
  }
`;

export const CustomPagination = styled(Pagination)`
  background: white;
  font-size: 13px !important;
  padding: 8px 16px 8px 16px;
  border-radius: 0px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: end;

  & li.ant-pagination-item {
    display: none;
  }

  & li.ant-pagination-prev {
    min-width: 20px;
    margin: 0px;
  }
  & li.ant-pagination-next {
    min-width: 20px;
    margin: 0px;
  }
  & button.ant-pagination-item-link {
    border: 0px !important;
  }

  & li.ant-pagination-jump-prev.ant-pagination-jump-prev-custom-icon {
    display: none;
  }
  & li.ant-pagination-jump-next.ant-pagination-jump-next-custom-icon {
    display: none;
  }
  & li.ant-pagination-options .ant-select-selector {
    border-radius: 0 !important;
    font-size: 13px !important;
  }
`;

export const CustomPaginationNoneBorder = styled(Pagination)`
  background: white;
  font-size: 13px !important;
  padding: 8px 16px 8px 16px;

  display: flex;
  justify-content: end;

  & li.ant-pagination-item {
    display: none;
  }

  & li.ant-pagination-prev {
    min-width: 20px;
    margin: 0px;
  }
  & li.ant-pagination-next {
    min-width: 20px;
    margin: 0px;
  }
  & button.ant-pagination-item-link {
    border: 0px !important;
  }

  & li.ant-pagination-jump-prev.ant-pagination-jump-prev-custom-icon {
    display: none;
  }
  & li.ant-pagination-jump-next.ant-pagination-jump-next-custom-icon {
    display: none;
  }
  & li.ant-pagination-options .ant-select-selector {
    border-radius: 0 !important;
    font-size: 13px !important;
  }
`;

export const TextInput = styled(Input)`
  border-radius: 4px;
  padding: 4px;
`;

export const CustomReactQuill = styled(ReactQuill)`
  & .ql-editor {
    width: 100%;
    height: 140px;
    overflow: auto;
    resize: vertical;
  }
  & .ql-toolbar.ql-snow {
    border-radius: 5px 5px 0px 0px;
  }
  & .ql-container.ql-snow {
    border-radius: 0px 0px 5px 5px !important;
  }
`;
