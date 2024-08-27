import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Small screen navigation */}
      <div className="lg:hidden flex">
        <Menu
          as="div"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <MenuButton className="flex ms-2 mt-3">
            <p className="text-white">Browse</p>
            <ChevronDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </MenuButton>

          {isOpen && (
            <MenuItems
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute text-white right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                >
                  Home
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                >
                  TV Shows
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                >
                  Movies
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                >
                  New & Popular
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                >
                  My List
                </a>
              </MenuItem>
            </MenuItems>
          )}
        </Menu>
      </div>
    </>
  );
};

export default NavMobile;