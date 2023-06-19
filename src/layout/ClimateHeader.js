import { Layout } from "antd";
import "./style.css";

const { Header } = Layout;

const ClimateHeader = () => {
  return (
    <Header className="flex justify-begin items-center climate-header">
      <div className="climate-header-title invisible md:visible">
        Climate Vault Assessment
      </div>
    </Header>
  );
};

export default ClimateHeader;
