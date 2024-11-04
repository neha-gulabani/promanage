import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';
import { useNavigate } from "react-router-dom";
import logo from '../images/promanage.png';
import ReactDOM from 'react-dom';

const Sidebar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirmation(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <button className="hamburger-menu" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>

            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="logo"><img src={logo} alt="Pro Manage Logo" />Pro Manage</div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/board" activeClassName="active"><i className="fa-solid fa-table-cells-large"></i>Board</NavLink>
                            </li>
                            <li>
                                <NavLink to="/analytics" activeClassName="active"><i className="fa-solid fa-database"></i>Analytics</NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings" activeClassName="active"><i className="fa-solid fa-gear"></i>Settings</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="logout">
                    <button onClick={handleLogout}><i className="fa-solid fa-right-to-bracket"></i> Log out</button>
                </div>
                {showLogoutConfirmation &&
                    ReactDOM.createPortal(
                        <div className="logout-confirmation-overlay">
                            <div className="logout-confirmation">
                                <p>Are you sure you want to Logout?</p>
                                <button className="confirm-button" onClick={confirmLogout}>Yes, Logout</button>
                                <button className="cancel-button" onClick={cancelLogout}>Cancel</button>
                            </div>
                        </div>,
                        document.body
                    )}
            </aside>
            <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
        </>
    );
};

export default Sidebar;
