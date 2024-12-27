import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { hooks } from "@api";

export function ViewInventoryById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: inventory, isLoading } = hooks.useGetSingleInventoryQuery(id);

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
                  Product: {inventory.data.product.name}
                </h1>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Quantity:</strong> {inventory.data.quantity}
                </p>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Warehouse Location:</strong>{" "}
                  {inventory.data.warehouseLocation}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
