import React from "react";
import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
