import { ConfigProvider, Layout } from "antd";
import React from "react";
import { Navigate, Route, Routes } from "react-router";

import ClimateHeader from "./ClimateHeader";
import ClimateSider from "./ClimateSider";

const Report = React.lazy(() => import("../pages/Report"));
const Configuration = React.lazy(() => import("../pages/Configuration"));
const NotFound = React.lazy(() => import("../pages/ErrorPage/NotFound"));
const LoadingComponent = React.lazy(() =>
  import("../pages/ErrorPage/LoadingComponent")
);

const ClimateLayout = () => {
  return (
    <ConfigProvider>
      <Layout className="absolute w-full h-full overflow-y-auto">
        <ClimateHeader />
        <Layout>
          <ClimateSider />
          <Layout.Content className="py-4 pr-4">
            <div className="climate-content max-h-full overflow-y-auto">
              <React.Suspense fallback={<LoadingComponent />}>
                <Routes>
                  <Route path="/" element={<Navigate replace to="/report" />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/configuration" element={<Configuration />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ClimateLayout;
