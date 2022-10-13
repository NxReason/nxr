import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <div className="header">
        <nav className="header-nav">
          <ul className="header-nav-links">
            <li>
              <Link to="/articles">articles</Link>
            </li>
            <li>
              <Link to="/tasks">tasks</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
