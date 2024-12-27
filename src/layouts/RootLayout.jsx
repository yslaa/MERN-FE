import React from "react";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

export const RootLayout = block(() => <Outlet />);
