import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@hooks";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    Toast(TOAST.INFO, `${product.name} removed from cart!`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    Toast(TOAST.SUCCESS, "Cart cleared!");
  };

  const handleContinue = () => {
    navigate("/home/checkout");
  };

  return (
    <section className="p-12">
      <h1 className="mb-6 text-3xl font-bold text-primary-default">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-light-default">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow-lg bg-light-variant"
              >
                <img
                  src={item.image[0]?.url}
                  alt={item.name}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-bold text-dark-default">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm text-dark-default/80">
                    {item.description}
                  </p>
                  <p className="mt-4 text-lg font-semibold text-primary-default">
                    ₱{item.price.toFixed(2)}
                  </p>
                  <p className="mt-2 text-sm text-dark-default/70">
                    Quantity: {item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="w-full px-4 py-2 mt-4 text-light-default bg-error-default hover:bg-error-default/60"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-12 space-x-4">
            <button
              onClick={handleClearCart}
              className="px-6 py-2 text-lg font-semibold rounded-md text-light-default bg-primary-default hover:bg-primary-default/70"
            >
              Clear Cart
            </button>
            <p className="text-xl font-bold text-light-default">
              Total Price: ₱{totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleContinue}
              className="px-6 py-2 text-lg font-semibold rounded-md text-light-default bg-secondary-default hover:bg-secondary-default/70"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </section>
  );
}
