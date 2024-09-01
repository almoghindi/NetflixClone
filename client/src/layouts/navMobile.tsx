import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NavMobile = () => {
  const profileDropDown = [
    {
      name: "Home",

      href: "/home",
    },
    {
      name: "TV Shows",

      href: "/tv",
    },
    {
      name: "New",

      href: "/new",
    },
    {
      name: "My List",

      href: "/mylist",
    },
  ];

  return (
    <>
      <div className="lg:hidden flex">
        <Menu as="div" className="relative  text-left">
          <div>
            <MenuButton className="ms-3 mt-2 text-white">
              <div className="flex mt-1">
                Browse
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ms-2 mt-1 h-5 w-5 text-gray-400"
                />
              </div>
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
            <MenuItem>
              <Link to="/"></Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default NavMobile;
