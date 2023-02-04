import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/footer/Footer";
import Navbar from "./layout/navbar/Navbar";
import Home from "./views/home/Home";
import Information from "./views/information/Information";
import Offer from "./views/information/Offer";
import UserAgreement from "./views/information/userAgreement";
import SpecialOrder from "./views/special/SpecialOrder";
import ScrollToTop from "./layout/navbar/ScrollToTop";
import Clients from "./views/information/Clients";
import PersonalAccount from "./views/information/PersonalAccount";
import Blog from "./views/information/Blog";
import Payment from "./views/information/Payment";
import Delivery from "./views/information/Delivery";
import Refund from "./views/information/Refund";
import About from "./views/about/About";
import Basket from "./views/basket/Basket";
import Checkout from "./views/basket/Checkout";
import Favorites from "./views/favorites/Favorites";
import SearchPage from "./views/search/SearchPage";
import Profile from "./views/profile/Profile";
import Adresses from "./views/profile/Adresses";
import Order from "./views/profile/Order";
import Filter from "./views/filter/Filter";
import Detail from "./views/detail/Detail";
import Stock from "./components/stock/Stock";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { connect } from "react-redux";

const Router = ({ isAuth }) => {
    return (
    <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes path="/">
          <Route index element={<Home />} />
          <Route path="/special-order" element={<SpecialOrder />} />
          <Route path="/information/offer" element={<Offer />} />
          <Route path="/information/information" element={<Information />} />
          <Route path="/information/user-agreement" element={<UserAgreement />} />
          <Route path="/information/clients" element={<Clients />} />
          <Route
            path="/information/personal-account"
            element={<PersonalAccount />}
          />
          <Route path="/information/blog" element={<Blog />} />
          <Route path="/information/payment" element={<Payment />} />
          <Route path="/information/delivery" element={<Delivery />} />
          <Route path="/information/refund" element={<Refund />} />
          <Route path="/about-company" element={<About />} />
          <Route path="/basket" element={
            <ProtectedRoute user={isAuth}>
              <Basket />
            </ProtectedRoute>
            } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={
            <ProtectedRoute user={isAuth}>
              <Favorites />
            </ProtectedRoute>
            } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={
            <ProtectedRoute user={isAuth}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/adresses" element={<Adresses />} />
          <Route path="/profile/order" element={<Order />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    );
}

const mapStateToProps = (state) => {

  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStateToProps, null)(Router);