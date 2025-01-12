import React from 'react';
import { BiSolidNotification } from 'react-icons/bi';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBook,
  BsUpload
} from 'react-icons/bs';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsBook className="icon_header" /> <h3 className="logo_name">Case Vault</h3>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/book-management">
            <BsFillArchiveFill className="icon" /> Book Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/category-management">
            <BsFillGrid3X3GapFill className="icon" /> Category Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/user-management">
            <BsPeopleFill className="icon" /> User Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/UploadCase.jsx">
            <BsUpload className="icon" /> Upload Book
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/notifications">
            <BiSolidNotification className="icon" /> Notifications
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/analytics-reports">
            <BsMenuButtonWideFill className="icon" /> Analytics/Reports
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/profile-settings">
            <BsFillGearFill className="icon" /> Profile Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
