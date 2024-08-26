import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import SignupFlow from "./pages/signup-flow";
import SignUpPageForm from "./components/signup/signup-form-page";
import VideoProcessor from "./components/video-test";
import PurchaseSuccess from "./components/payment/purchase-success";
import HomePage from "./pages/home-page";
import Footer from "./layouts/footer";
import WatchMovie from "./components/shared/watchMovie";
import Nav from "../src/layouts/nav";


const App: React.FC = () => {
  return (
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/steam-test" element={<VideoProcessor />} />

        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        
        {/* <Route path="/watch:id" element={<WatchMovie />} /> */}

      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
