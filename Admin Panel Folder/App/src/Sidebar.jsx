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
          <Link to="/">
            <BsFillArchiveFill className="icon" /> Book Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/UploadCase.jsx">
            <BsUpload className="icon" /> Upload Case
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
