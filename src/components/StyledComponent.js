import styled from "styled-components";
import {
  DatePicker,
  Input,
  Menu,
  Select,
  Steps,
  Pagination,
  Table,
  Dropdown,
  InputNumber,
  Tabs,
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
  color: rgb(107 114 128);
  font-size: 14px !important;
  font-weight: 500;
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
    top: 80% !important;
    inset-inline-end: 16px !important;
  }
`;

export const DigitInput = styled(InputNumber)`
  & .ant-input-number-handler-wrap {
    display: none !important;
  }

  & .ant-input-number-input {
    text-align: center;
  }

  height: 100px !important;
  width: 80px !important;
  display: flex;

  @media only screen and (max-width: 768px) {
    height: 80px !important;
    width: 64px !important;
  }

  @media only screen and (max-width: 576px) {
    height: 60px !important;
    width: 48px !important;
  }

  @media only screen and (max-width: 480px) {
    height: 40px !important;
    width: 32px !important;
  }

  @media only screen and (max-width: 420px) {
    height: 100px !important;
    width: 80px !important;
  }

  & .ant-input-number-input-wrap {
    font-size: 60px;
    height: 100px !important;
    @media only screen and (max-width: 768px) {
      height: 80px !important;
      font-size: 50px;
    }
    @media only screen and (max-width: 576px) {
      height: 60px !important;
      font-size: 40px;
    }
    @media only screen and (max-width: 480px) {
      height: 40px !important;
      font-size: 20px;
    }
    @media only screen and (max-width: 420px) {
      font-size: 60px;
      height: 100px !important;
    }
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
/* SEARCH JOB */
export const SearchInput = styled(Input)`
  min-height: 60px !important;
  & input#searchForm_searchText::placeholder {
    color: black !important;
  }
`;

export const SearchMultipleSelect = styled(Select)`
  margin-top: -20px;
  & .ant-select-selector {
    min-height: 45px !important;
  }

  & .ant-select-selection-placeholder {
    color: black !important;
  }

  & span.ant-select-selection-item {
    height: 30px;
    align-items: center;
    background: #f9f0ff !important;
    color: #531dab !important;
    border-color: #d3adf7 !important;
  }
`;

//----------------------------------------------------
/* GENERAL */

export const MenuDashboard = styled(Menu)`
  & li.ant-menu-item.ant-menu-item-selected {
    background-color: #8f83ae;
    color: white;
    font-weight: 700;
    border-radius: 5px !important;
  }
  & .ant-menu-submenu-title {
    color: white !important;
  }
  & .ant-menu-item-active {
    color: white !important;
    background-color: #8f83ae !important;
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
  border-radius: 0.5rem;
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
    padding-top: 18px !important;
    padding-bottom: 18px !important;
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
    //  background-color: #fff4e8 !important;
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

export const CustomInput = styled(Input)`
  border-radius: 4px;
  padding: 4px;
  padding-left: 12px;
`;

export const CustomSelect = styled(Select)`
  & .ant-select-selector {
    border-radius: 5px !important;
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const CustomRangePicker = styled(DatePicker.RangePicker)`
  width: 100%;
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

export const CustomSearch = styled(Input)`
  height: 64px;
  border-radius: 0;
  border: 0;
`;

export const CustomDropdown = styled(Dropdown)`
  & li.ant-menu-item.ant-menu-item-selected {
    background-color: #444cf8;
    color: white;
    font-weight: 700;
    border-radius: 5px !important;
  }
  & .ant-menu-submenu-title {
    color: white !important;
  }
  & .ant-menu-item-active {
    color: white !important;
    background-color: #444cf8 !important;
  }
`;

export const CustomTabs = styled(Tabs)`
  height: 100%;
  & .ant-tabs-tab {
    padding-top: 20px !important;
  }

  & .ant-tabs-content {
    height: 100%;
  }

  & .ant-tabs-tab-btn {
    transition: all 100ms !important;
    font-weight: 600;
  }
  & .ant-tabs-tab-btn:hover {
    color: rgb(29 78 216) !important;
    font-weight: 600;
  }

  & div.ant-tabs-tab:hover {
    color: rgb(29 78 216) !important;
    font-weight: 600;
  }

  & .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgb(29 78 216) !important;
    font-weight: 600;
  }

  & .ant-tabs-ink-bar {
    background-color: rgb(29 78 216);
  }

  &.ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before {
    display: none;
  }
`;

//----------------------------------------------------
/* GENERAL */
