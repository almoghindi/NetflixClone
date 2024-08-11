import Login from "../components/login";
import Signup from "../components/signup";
import Logout from "../components/logout";


const LoginPage: React.FC = () => {


  return (
    <>
      <Logout />
      <Signup /> 
      <Login />
    </>
  );
};

export default LoginPage;