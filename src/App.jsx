import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  ResetLink,
  ResetPassword,
  Dashboard,
  Product,
  ViewProductById,
  CreateProduct,
  EditProduct,
  Inventory,
  ViewInventoryById,
  CreateInventory,
  EditInventory,
  Transaction,
  ViewTransactionById,
  EditTransaction,
  EditProfile,
  ChangePassword,
  Home,
  Cart,
  CreateTransaction,
  History,
} from "@/pages";
import {
  AdminLayout,
  CustomerLayout,
  HomeLayout,
  NotFound,
  RootLayout,
} from "@/layouts";
import { PrivateRoute, PublicRoute } from "@/components";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />}>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route element={<HomeLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="resetLink" element={<ResetLink />} />
                <Route path="resetPassword" element={<ResetPassword />} />
              </Route>
            </Route>

            {/* Private Routes */}
            {/* Admin Routes */}
            <Route element={<PrivateRoute role="Admin" />}>
              <Route path="dashboard" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="product" element={<Product />} />
                <Route path="product/:id" element={<ViewProductById />} />
                <Route path="product/create" element={<CreateProduct />} />
                <Route path="product/edit/:id" element={<EditProduct />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="inventory/:id" element={<ViewInventoryById />} />
                <Route path="inventory/create" element={<CreateInventory />} />
                <Route path="inventory/edit/:id" element={<EditInventory />} />
                <Route path="transaction" element={<Transaction />} />
                <Route
                  path="transaction/:id"
                  element={<ViewTransactionById />}
                />
                <Route
                  path="transaction/edit/:id"
                  element={<EditTransaction />}
                />
                <Route path="profile/edit/:id" element={<EditProfile />} />
                <Route
                  path="profile/changePassword/:id"
                  element={<ChangePassword />}
                />
              </Route>
            </Route>

            {/* Customer Routes */}
            <Route element={<PrivateRoute role="Customer" />}>
              <Route path="home" element={<CustomerLayout />}>
                <Route index element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<CreateTransaction />} />
                <Route path="history" element={<History />} />
                <Route path="profile/edit/:id" element={<EditProfile />} />
                <Route
                  path="profile/changePassword/:id"
                  element={<ChangePassword />}
                />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>,
        ),
      )}
    />
  );
}
