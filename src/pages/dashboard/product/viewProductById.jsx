import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { hooks } from "@api";

export function ViewProductById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = hooks.useGetSingleProductQuery(id);

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
                  {product.data.name}
                </h1>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Description:</strong> {product.data.description}
                </p>
                <p className="mb-4 text-lg text-dark-default">
                  <strong>Price:</strong> ${product.data.price}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {product.data.image.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`Image ${index + 1} of ${product.data.name}`}
                    className="object-cover w-full h-auto max-w-sm border rounded-lg shadow-md border-primary-default"
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
