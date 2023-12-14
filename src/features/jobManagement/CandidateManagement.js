import { Tabs } from "antd";
import { CustomTabs } from "../../components/StyledComponent";
import CheckingCV from "./CheckingCV";
import Interview from "./Interview";
import Evaluation from "./Evaluation";

const CandidateManagement = () => {
  return (
    <>
      <div className="text-2xl font-semibold">Candidate Management</div>
      <CustomTabs defaultActiveKey="1">
        <Tabs.TabPane key="1" tab="Checking CV">
          <CheckingCV />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Interview">
          <Interview />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Evaluation">
          <Evaluation />
        </Tabs.TabPane>
      </CustomTabs>
    </>
  );
};
export default CandidateManagement;
