import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./pages/HomeScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import CartScreen from "./pages/cartScreen";
import LogInScreen from "./pages/LogInScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen";

const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      <main className="flex-1 p-4 ">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path={`/product/:id`} element={<ProductDetailScreen />} />
          <Route path={`/cart`} element={<CartScreen />} />
          <Route path={`/login`} element={<LogInScreen />} />
          <Route path={`/register`} element={<RegisterScreen />} />
          <Route path={`/shipping`} element={<ShippingScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
