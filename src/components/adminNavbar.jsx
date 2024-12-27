import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@hooks";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate(`/dashboard/profile/edit/${user?._id}`);
  };

  const handleChangePassword = () => {
    setDropdownOpen(false);
    navigate(`/dashboard/profile/changePassword/${user?._id}`);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(authActions.logout());
    navigate("/");
    Toast(TOAST.SUCCESS, "Logged out successfully");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative w-full shadow-lg h-28 bg-gradient-to-r from-primary-default via-secondary-default to-info-secondary">
      <div className="absolute inset-0 bg-opacity-50 bg-dark-shadow/25"></div>

      <div className="relative flex items-center justify-between h-full px-8">
        <h1 className="text-4xl font-bold text-light-variant drop-shadow-lg">
          Welcome, {user?.firstName || "Admin"}!
        </h1>

        <nav className="relative flex items-center space-x-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard/product")}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Product
          </button>
          <button
            onClick={() => navigate("/dashboard/inventory")}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Inventory
          </button>
          <button
            onClick={() => navigate("/dashboard/transaction")}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Transaction
          </button>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-primary-variant"
            >
              <img
                src={user?.image[0]?.url}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 z-10 mt-2 rounded-md shadow-lg bg-light-default w-52">
                <li>
                  <button
                    onClick={handleProfile}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-primary-default hover:text-light-default"
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleChangePassword}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-primary-default hover:text-light-default"
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-primary-default hover:text-light-default"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
