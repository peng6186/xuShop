import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./pages/HomeScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import CartScreen from "./pages/CartScreen";
import LogInScreen from "./pages/LogInScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AdminProtecRoute from "./components/AdminProtecRoute";
import OrderListScreen from "./pages/admin/OrderListScreen";
import ProductListScreen from "./pages/admin/ProductListScreen";
import ProductEditScreen from "./pages/admin/ProductEditScreen";
import UserListScreen from "./pages/admin/UserListScreen";
import UserEditScreen from "./pages/admin/UserEditScreen";

const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      <main className="flex-1 p-4 ">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />
          <Route path={`/product/:id`} element={<ProductDetailScreen />} />
          <Route path={`/cart`} element={<CartScreen />} />
          <Route path={`/login`} element={<LogInScreen />} />
          <Route path={`/register`} element={<RegisterScreen />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path={`/shipping`} element={<ShippingScreen />} />
            <Route path={`/payment`} element={<PaymentScreen />} />
            <Route path={`/placeorder`} element={<PlaceOrderScreen />} />
            <Route path={`/order/:id`} element={<OrderScreen />} />
            <Route path={`/profile`} element={<ProfileScreen />} />
          </Route>
          <Route path="" element={<AdminProtecRoute />}>
            <Route path={`/admin/orderlist`} element={<OrderListScreen />} />
            <Route
              path={`/admin/productlist`}
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
