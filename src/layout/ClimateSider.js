import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";

import { Layout, Menu } from "antd";
import { FileSearchOutlined, SettingOutlined } from "@ant-design/icons";

import "./style.css";

const { Sider } = Layout;

const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});

const items = [
  getItem("Report", "report", <FileSearchOutlined />),
  getItem("Configuration", "configuration", <SettingOutlined />),
];

const urls = {
  report: "/report",
  configuration: "/configuration",
};

export const ClimateSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setSelected(
      (Object.entries(urls).find((value) => value[1] === location.pathname) ?? [
        "",
      ])[0]
    );
  }, [location.pathname]);

  return (
    <Sider
      width={256}
      style={{ backgroundColor: "transparent" }}
      className="p-4"
      breakpoint="lg"
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed);
      }}
    >
      <Menu
        className="sider-menu max-h-full overflow-y-auto pt-2"
        mode="inline"
        selectedKeys={[selected]}
        items={items}
        inlineCollapsed={collapsed}
        onClick={({ key }) => {
          navigate(urls[key]);
        }}
      />
    </Sider>
  );
};
