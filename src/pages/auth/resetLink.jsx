import React from "react";
import { useNavigate } from "react-router-dom";
import { LockImg, VerifiedImg } from "@assets";
import { MyCarousel } from "@components";

export function ResetLink() {
  const navigate = useNavigate();

  return (
    <section className="grid h-full grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      <div className="relative flex items-center justify-center w-full h-screen p-6 overflow-y-auto lg:p-10 xl:px-32 scrollbar-thin">
        <div className="w-full mt-20 xl:max-w-md lg:max-w-sm md:max-w-[20rem] xl:mt-8 lg:mt-16 text-center">
          <h1 className="mb-1 text-lg font-semibold 2xl:text-4xl xl:text-3xl lg:text-2xl">
            Reset Your Password
          </h1>
          <p className="text-sm xl:text-lg">
            Check your email for forgot password instruction
          </p>

          <div className="flex items-center justify-center">
            <img
              src={VerifiedImg}
              alt="VerifiedImg"
              className="object-cover pt-12 pb-16 xl:w-fit xl:h-fit md:w-[55%] md:h-[55%]"
            />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/resetPassword")}
            className="w-full py-3 mb-6 text-lg rounded-md bg-dark-secondary text-light-default"
          >
            Continue
          </button>

          <div className="flex items-end justify-center gap-x-3">
            <img src={LockImg} alt="LockImg" />
            <h1 className="text-sm text-light-tertiary">
              Your Info is safely secured
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
