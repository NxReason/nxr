import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import './index.css';
import Layout from './routes/Layout';
import LoginForm from './routes/LoginForm';
import ArticleList from './components/ArticleList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArticleList />,
      },
      {
        path: '/articles',
        element: <ArticleList />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
