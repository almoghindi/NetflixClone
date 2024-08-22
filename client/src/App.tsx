import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "../src/layouts/nav";
import Footer from "./layouts/footer";
import { HomePage } from "./pages/home-page";
import WatchMovie from "./components/shared/watchMovie";
// import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* {!isLoggedIn && <Login />} */}
        <Route path="/watch:id" element={<WatchMovie />} />
      </Routes>
    </Router>
  );
};
export default App;
