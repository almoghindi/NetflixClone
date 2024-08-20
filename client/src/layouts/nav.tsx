import netflixLogo from "../assets/img/Netflix_assests/Netflix_Logo_CMYK.png";
import NavProfile from "./nav-profie";
import NavMobile from "./navMobile";
import { PopoverGroup } from "@headlessui/react";

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="size-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  />
</svg>;

export default function Navbar() {
  // const [bgColor, setBgColor] = useState("bg-transparent");

  // const handleScroll = () => {
  //   if (window.scrollY > 20) {
  //     setBgColor("bg-black");
  //   } else {
  //     setBgColor("bg-transparent");
  //   }
  // };

  return (
    <header
      // onScroll={handleScroll}
      className="navbar sticky top-0 inset-x-0    z-40 "
    >
      <nav
        aria-label="Global"
        className=" flex  absolute top-0 inset-x-0 items-center justify-between p-5 lg:px-8  "
      >
        <div className="flex lg:flex-0">
          <a href="/" className="-m-1.5 p-1.5">
            <img alt="netflix logo" src={netflixLogo} className="h-14 w-17" />
          </a>

          <PopoverGroup className="hidden  lg:flex lg:gap-x-12 ms-20 mt-4">
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Home
            </a>

            <a href="#" className="text-sm font-semibold leading-6 text-white">
              TV Shows
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Movies
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              New & Popular
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              My List
            </a>
          </PopoverGroup>

          {/* profile section */}
          <div className="left-10">
            <NavMobile />
          </div>
        </div>

        <NavProfile />
      </nav>
    </header>
  );
}
