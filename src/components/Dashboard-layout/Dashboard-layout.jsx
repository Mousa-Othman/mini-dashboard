// src/components/DashboardLayout/DashboardLayout.jsx
import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Heade.jsx";
import styles from "./Dashboard-layout.module.css";

function DashboardLayout({ children }) {
  return (
    <div className={`${styles.dashboardLayout} d-flex`}>
      <Sidebar />
      <div className={`${styles.mainContent} flex-grow-1`}>
        <Header />
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
