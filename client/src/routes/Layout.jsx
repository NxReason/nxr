import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>articles</li>
          <li>tasks</li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
