import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <>
      <ul className="list-group d-md-none d-flex 
       flex-row flex-wrap"
  style={{
    position: 'fixed',
    top: 0,
    right: 0,
    // width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#6c757d',
    borderRadius: 0,
    zIndex: 1000,
  }}> {/* يظهر في الموبايل فقط */}
        <li className="list-group-item">
          <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <a
            href="https://mousa-othman.github.io/My-Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            Profile
          </a>
        </li>
        <li className="list-group-item">
          <Link to="/login" className="text-decoration-none text-dark">Logout</Link>
        </li>
      </ul>
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
    </>
    
  );
};

export default Sidebar;
