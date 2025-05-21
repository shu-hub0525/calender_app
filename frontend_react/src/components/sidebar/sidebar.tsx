import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <nav
      style={{
        width: "200px",
        background: "#f0f0f0",
        padding: "1rem",
        height: "100vh", // 画面の高さに指定
        boxSizing: "border-box",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/admin/meeting">研究ゼミ</Link>
        </li>
        <li>
          <Link>バイト時間</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;