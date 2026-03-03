import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import BreadCrumb from "../../components/common/BreadCrumb";
import { Outlet, useLocation } from "react-router-dom";
import { useBreadcrumbContext } from "../../context/BreadcrumbContext";
// import Crash from "../common/Crash";

export default function MainLayout() {
  const { items, setItems } = useBreadcrumbContext();
  const location = useLocation();

  useEffect(() => {
    setItems([]); // reset on every route change
  }, [location.pathname]);

  return (
    <div className="app-layout">
      {/* <Crash /> */}
      <Navbar />

      {/* all content & common breadcrumb */}
      <main className="main-content">
        <BreadCrumb items={items} />
        <Outlet />
      </main>
    </div>
  );
}
