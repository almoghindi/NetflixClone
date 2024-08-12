

import  netflixLogo from "../assets/img/Netflix_assests/Netflix_Logo_RGB.png";

const HeaderLandingPage = () => {
  return (
<header className="">
      <nav
        aria-label="Global"
        className=" flex  items-center justify-between p-5 lg:px-8"
      >
        <div className="flex lg:flex-0">
          <a href="/" className="-m-1.5 p-1.5">
            <img alt="netflix logo" src={netflixLogo} className="h-14 w-17" />
          </a>
        </div>
      </nav>
</header>
)
}

export default HeaderLandingPage