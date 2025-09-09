import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          {/* رابط خارجي */}
          <a
            href="https://mousa-othman.github.io/My-Portfolio/"
            target="_blank"  // يفتح في تاب جديد
            rel="noopener noreferrer"
          >
            Profile
          </a>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
