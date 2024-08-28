import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./layouts/footer";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import SignupFlow from "./pages/signup-flow";

import SignUpPageForm from "./components/signup/signup-form-page";

import VideoProcessor from "./components/video-test";
import Nav from "../src/layouts/nav";

import HomePage from "./pages/home-page";
// import WatchMovie from "./components/shared/watchMovie";
import Footer from "./layouts/footer";
import SearchPage from "./pages/search-page";
import Navbar from "../src/layouts/nav";
// import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Nav /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/regform" element={<SignUpPageForm />} /> */}
        {/* <Route path="/subscriptions" element={<SubscriptionPage />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/regform" element={<SignUpPageForm />} /> */}
        {/* <Route path="/subscriptions" element={<SubscriptionPage />} /> */}
        <Route path="/signup" element={<SignupFlow />} />
        <Route
          path="/signup/regform"
          element={
            <SignUpPageForm
              onNext={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path="/signup" element={<SignupFlow />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/steam-test" element={<VideoProcessor />} />
        {/* {!isLoggedIn && <Login />} */}
        {/* <Route path="/watch:id" element={<WatchMovie />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
