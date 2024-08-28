import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import blueIcon from "../assets/img/blueIcon.jpg";
import redIcon from "../assets/img/redIcon.jpg";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  PencilIcon,
  ArrowPathRoundedSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import SearchBar from "./searchBar";

const NavProfile = () => {
  const profileDropDown = [
    {
      name: "Mange Profile",

      href: "#",
      icon: PencilIcon,
    },
    {
      name: "Transfer Account",

      href: "#",
      icon: ArrowPathRoundedSquareIcon,
    },
    {
      name: "Account",

      href: "#",
      icon: UserIcon,
    },
    {
      name: "Sign out of Netflix",

      href: "#",
    },
  ];

  const profileColor = [blueIcon, redIcon];
  const profileColorPicker =
    profileColor[Math.floor(Math.random() * profileColor.length)];

  return (
    <div className="flex  lg:flex lg:flex-1 lg:justify-end me-10 ">
      <SearchBar />

      <BellIcon className="h-7 w-7 me-5 ms-6 mt-1 text-white cursor-pointer" />
      <a href="#" className="text-sm font-semibold leading-6 text-white">
        <img
          src={profileColorPicker}
          className="h-8 w-8 rounded cursor-pointer"
          alt=""
        />
      </a>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="ms-3 mt-2">
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className={
            "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          }
        >
          {profileDropDown.map((item) => (
            <div
              key={item.name}
              className="block px-4 py-2 text-sm text-white-700 data-[focus]:bg-gray-100 data-[focus]:text-white"
            >
              <MenuItem>
                <Link
                  to={item.href}
                  className="block px-4 py-2 text-sm text-white"
                >
                  <div className="flex  ">
                    <div className="mr-2">
                      {item.icon && <item.icon aria-hidden="true" width={22} />}
                    </div>
                    {item.name}
                  </div>
                </Link>
              </MenuItem>
            </div>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default NavProfile;
