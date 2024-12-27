import React from "react";
import { FadeLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { hooks } from "@api";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { addToCart } from "@hooks";

export function Home() {
  const { data: activeProducts, isLoading: isActiveLoading } =
    hooks.useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Toast(TOAST.SUCCESS, `${product.name} added to cart!`);
  };

  return (
    <section className="p-12">
      {isActiveLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activeProducts?.data?.map((product) => (
            <div
              key={product._id}
              className="p-4 transition-shadow border rounded-lg shadow-lg bg-light-variant hover:shadow-xl"
            >
              <img
                src={product.image[0]?.url}
                alt={product.name}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-lg font-bold text-dark-default">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-primary-default">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full px-4 py-2 mt-4 text-white rounded-md bg-primary-default hover:bg-primary-default/50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
