import React from 'react'
import { BiSolidNotification } from 'react-icons/bi'
import 
{BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
 BsMenuButtonWideFill, BsFillGearFill,
  BsBook,
  BsUpload}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsBook  className='icon_header'/> <h3 className='logo_name'>Case Vault</h3>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Book Managment
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Category Managment
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> User Managment
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsUpload className='icon'/> Upload Book
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BiSolidNotification className='icon'/> Notifications
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Analytics/Reports 
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Profile Settings
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar