import React from "react";
import { NotFoundImg } from "@assets";

export function NotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={NotFoundImg} alt="Not Found" />
      <h1 className="pt-3 pb-2 text-3xl font-semibold md:pt-12 md:pb-6 xs:text-4xl">
        Not Found
      </h1>
      <h2 className="px-4 text-lg text-center xs:text-2xl">
        The requested page could not be found.
      </h2>
      <br />
      <button
        title="Go Back"
        onClick={goBack}
        className="px-8 py-2 text-xl font-medium duration-200 rounded-md md:text-2xl bg-secondary-variant text-light-default hover:ease-in hover:bg-light-default hover:text-dark-default"
      >
        Go Back
      </button>
    </div>
  );
}
