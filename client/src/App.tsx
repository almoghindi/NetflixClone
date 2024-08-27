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

import VideoPlayer from "./components/video-test";
import MyList from "./components/content/my-list";
import TvShows from "./pages/tv-shows";
import Movies from "./pages/movies";

const App: React.FC = () => {
  return (

    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/mylist" element={<MyList/>} />
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
        
        <Route path="/main-movie/play" element={<VideoPlayer />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        

      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
