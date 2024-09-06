import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import ProfileManager, { Profile } from "./components/profile/profile-manager";
import AddProfile from "./components/profile/add-profile";
import SelectProfile from "./components/profile/select-profile";
import VideoPlayer from "./components/video-test";
import MyList from "./components/content/my-list";
import TvShows from "./pages/tv-shows";
import Movies from "./pages/movies";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import WatchTrailers from "./components/content/watch-trailers";
import SearchPage from "./pages/search-page";
import Navbar from "../src/layouts/nav";
import EditProfileIcon from "./components/profile/profile-settings/edit-icon";
import EditProfile from "./components/profile/edit-profile";


const App: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      {user === null || user?.subscription === "NOT_PAID" ? null : <Navbar />}
      <Routes>
        {user === null || user?.subscription === "NOT_PAID" ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
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
            <Route path="/signup/*" element={<SignupFlow />} />
            <Route
              path="/choose-payment"
              element={<SignupFlow initialStep={4} />}
            />
            <Route path="/signup" element={<SignupFlow />} />
            <Route path="/purchase-success" element={<PurchaseSuccess />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profiles" element={<SelectProfile />} />
            <Route path="/profiles/manage" element={<ProfileManager />} />
            <Route path="/profiles/add" element={<AddProfile />} />
            <Route path="/profiles/manage/edit/:profileId" element={<EditProfile profile={user?.profileId as unknown as Profile } onClose={function (): void {
                throw new Error("Function not implemented.");
              } } />}  />
            <Route path="/profile/edit-icon" element={<EditProfileIcon />} />
            <Route path="/edit-profile-icon" element={<EditProfileIcon />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/steam-test" element={<VideoProcessor />} />
            <Route path="/main-movie/play" element={<VideoPlayer />} />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/watch/:movieId/:type" element={<WatchTrailers />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
