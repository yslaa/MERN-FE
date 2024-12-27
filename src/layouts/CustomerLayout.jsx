import React from "react";
import { Outlet } from "react-router-dom";
import { CustomerNavbar } from "@components";

export function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="z-[1000] sticky top-0">
        <CustomerNavbar />
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
