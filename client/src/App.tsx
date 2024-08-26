import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/footer";
import SubscriptionPage from "./pages/subscription-page";
import HomePage from "./pages/home-page";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import SignupFlow from "./pages/signup-flow";
import WatchMovie from "./components/shared/watchMovie";
// import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      {/* <HeaderLandingPage /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/regform" element={<SignUpPageForm />} /> */}
        <Route path="/subscriptions" element={<SubscriptionPage />} />
        <Route path="/signup" element={<SignupFlow />} />
        {/* <Route path="/signup/regform" element={<SignUpPageForm />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<HomePage />} />
        {/* {!isLoggedIn && <Login />} */}
        <Route path="/watch:id" element={<WatchMovie />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
