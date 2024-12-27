import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { hooks } from "@api";

export function ViewTransactionById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: transaction, isLoading } =
    hooks.useGetSingleTransactionQuery(id);

  return (
    <section className="p-4">
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 mb-6 rounded-md text-light-default bg-primary-default"
          >
            Go Back
          </button>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start w-full max-w-3xl p-6 space-y-6 rounded-lg shadow-lg bg-light-variant">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="mb-4 text-3xl font-bold text-primary-default">
                  Transaction Details
                </h1>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>User:</strong> {transaction?.data?.user?.firstName}
                  {transaction?.data?.user?.lastName}
                </p>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Total Price:</strong> ₱
                  {transaction?.data?.totalPrice.toLocaleString()}
                </p>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Payment Method:</strong> {transaction?.data?.payment}
                </p>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Status:</strong> {transaction?.data?.status}
                </p>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-primary-default">
                    Products:
                  </h2>
                  <ul className="list-disc list-inside text-dark-default">
                    {transaction?.data?.product.map((item, index) => (
                      <li key={index}>
                        <strong>Product:</strong> {item.id.name} -{" "}
                        <strong>Quantity:</strong> {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
