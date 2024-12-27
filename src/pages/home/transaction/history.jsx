import React from "react";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { hooks } from "@api";

export function History() {
  const { data: allTransactions, isLoading } =
    hooks.useGetAllTransactionsQuery();
  const loggedInUser = useSelector((state) => state.auth.user);

  const transactionHistory = allTransactions?.data?.filter(
    (transaction) =>
      (transaction.status === "Pending" ||
        transaction.status === "Completed") &&
      transaction.user._id === loggedInUser._id,
  );

  return (
    <section className="p-4">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary-default">
              Transaction History
            </h1>
          </div>
          {transactionHistory?.length === 0 ? (
            <p className="text-xl text-gray-600">No transactions found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {transactionHistory.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-4 border rounded-lg shadow-md bg-light-variant"
                >
                  <h2 className="mb-2 text-lg font-bold text-dark-default">
                    Transaction ID: {transaction._id}
                  </h2>
                  <div className="mb-2">
                    <h3 className="font-semibold text-dark-default">
                      Products:
                    </h3>
                    <ul className="pl-4 list-disc text-dark-default/80">
                      {transaction.product.map((product, index) => (
                        <li key={index}>
                          {product.quantity} x {product.id.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mb-2 text-dark-default">
                    <span className="font-semibold">Total Price:</span> ₱
                    {transaction.totalPrice}
                  </p>
                  <p className="mb-2 text-dark-default">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {transaction.payment}
                  </p>
                  <p className="mb-2 text-dark-default">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-primary-default">
                      {transaction.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
