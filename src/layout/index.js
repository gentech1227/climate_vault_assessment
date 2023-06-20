import React from "react";
import { Navigate, Route, Routes } from "react-router";

import { ConfigProvider, Layout } from "antd";

import { ClimateHeader } from "./ClimateHeader";
import { ClimateSider } from "./ClimateSider";
import { Configuration } from "../pages/Configuration";
import { Report } from "../pages/Report";
import { NotFound } from "../pages/ErrorPage/NotFound";

export const ClimateLayout = () => {
  return (
    <ConfigProvider>
      <Layout className="absolute w-full h-full overflow-y-auto">
        <ClimateHeader />
        <Layout>
          <ClimateSider />
          <Layout.Content className="py-4 pr-4">
            <div className="climate-content max-h-full overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate replace to="/report" />} />
                <Route path="/report" element={<Report />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
