import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PencilIcon,
  ArrowPathRoundedSquareIcon,
  UserIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import netflixLogo from "../assets/img/Netflix_assests/Netflix_Logo_CMYK.png";
import blueIcon from "../assets/img/blueIcon.jpg";
import redIcon from "../assets/img/redIcon.jpg";
import { Link } from "react-router-dom";

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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileColor = [blueIcon, redIcon];
  const profileColorPicker =
    profileColor[Math.floor(Math.random() * profileColor.length)];

  const navbarBackground = () => {
    if (window.scrollY > 50) {
      return "bg-black";
    }
  };

  return (
    <header
      onScroll={navbarBackground}
      className="bg-black navbar sticky top-0   z-10"
    >
      <nav
        aria-label="Global"
        className=" flex  items-center justify-between p-5 lg:px-8  "
      >
        <div className="flex lg:flex-0">
          <a href="/" className="-m-1.5 p-1.5">
            <img alt="netflix logo" src={netflixLogo} className="h-14 w-17" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            {/* open menu mobile */}
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ms-20">
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

          {/* profile section */}
        </PopoverGroup>
        <div className="hidden  lg:flex lg:flex-1 lg:justify-end me-10">
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            <img src={profileColorPicker} className="h-10 w-10" alt="" />
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
                          {item.icon && (
                            <item.icon aria-hidden="true" width={22} />
                          )}
                        </div>
                        {item.name}
                      </div>
                    </Link>
                  </MenuItem>
                </div>
              ))}
            </MenuItems>
          </Menu>

          <button className="">{}</button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
