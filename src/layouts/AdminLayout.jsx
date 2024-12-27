import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "@components";

export function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="z-[1000] sticky top-0">
        <AdminNavbar />
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
