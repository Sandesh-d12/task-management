import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/authSlice";
import Button from "./button/Button";
import { toast } from "react-hot-toast";


export default function Profile({ title = "Profile" }) {
  const user = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearToken());
    toast.success("Successfully logged out");
  };

  return (
    <div className="fixed w-ful px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={"flex"}>
              <span className="block py-2 px-3 text-white rounded  md:p-0 ">
                {title}
              </span>
              <ChevronDownIcon
                className={`${open ? "text-orange-300" : "text-indigo-300/70"}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:bg-white-600`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 top-9 z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xs">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative flex gap-2 bg-white p-7 flex-col items-start">
                    name:{user?.name}
                    <div>email: {user?.email}</div>
                    {/* <button
                      onClick={handleClick}
                      className="block py-2 px-3 text-white-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Log Out
                    </button> */}
                    <Button handleClick={handleClick} text="Log out" />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
