import { Outlet } from "react-router-dom";
import Profile from "./Profile";
import CompanyLogo from '../assets/CompanyLogo';

export default function Navbar({children}) {
  const navData = [
    {
      title: "Pending Tasks",
      href: "/pending-tasks",
    },
    {
      title: "Completed Tasks",
      href: "/completed-tasks",
    },
    {
      title: "Add Task",
      href: "/add-task",
    },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-navBar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
           <CompanyLogo />
            <span className="block py-2 px-3 text-white rounded  md:p-0">
              Task Management
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"></div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {navData.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-2 px-3 text-white rounded  md:p-0 "
                    aria-current="page"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <Profile />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      </>
  );
}
