import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./components/Login";

// Pages
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import CustomerProfile from "./components/CustomerProfile";
import Seller from "./components/Sellers";
import SellerProfile from "./components/SellerProfile";
import DeliveryPartners from "./components/DeliveryPartners";
import DeliveryProfile from "./components/DeliveryProfile";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import DeletedProducts from "./components/DeletedProducts";
import CategoryList from "./components/Categories";
import MarketRates from "./components/MarketRates";
import WeatherSettings from "./components/WeatherSettings";
import WebsiteContentMgnt from "./components/WebsiteContentMgnt";
import Admins from "./components/Admins";
import TicketsSupport from "./components/TicketsSupport";
import Offers from "./components/Offers";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile"
import Settings from "./components/Settings";
import Payments from "./components/Payments";
import Orders from "./components/Orders";
import AddProduct from "./components/AddProduct"


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page - opens first */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/sellers" element={<Seller />} />
          <Route path="/seller/:id" element={<SellerProfile />} />
          <Route path="/delivery" element={<DeliveryPartners />} />
          <Route path="/delivery-profile/:id" element={<DeliveryProfile />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/deletedproducts" element={<DeletedProducts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/market-rates" element={<MarketRates />} />
          <Route path="/weather-settings" element={<WeatherSettings />} />
          <Route path="/websites" element={<WebsiteContentMgnt />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/support" element={<TicketsSupport />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
