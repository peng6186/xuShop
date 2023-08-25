import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./pages/HomeScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import CartScreen from "./pages/cartScreen";
const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 ">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path={`/product/:id`} element={<ProductDetailScreen />} />
          <Route path={`/cart`} element={<CartScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
