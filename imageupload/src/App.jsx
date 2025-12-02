import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import GetProduct from './AdminPages/GetProduct/GetProduct';
import AddProduct from './AdminPages/AddProduct/AddProduct';




function App() {
   const router = createBrowserRouter([
  {
    path: "/",
    Component: GetProduct  },
    {
      path: "/add-product",
      Component: AddProduct
    },
    
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);

  return (
    <>
      
    </>
  )
}

export default App
