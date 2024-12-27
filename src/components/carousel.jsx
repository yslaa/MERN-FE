import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthImg, CoverImg, NotFoundImg } from "@assets";
export function MyCarousel() {
  return (
    <div
      className="items-center justify-center hidden w-full h-screen p-8 bg-center bg-cover md:flex"
      style={{ backgroundImage: `url(${AuthImg})` }}
    >
      <div className="flex items-center justify-center w-full h-full lg:p-12 2xl:p-28">
        <div className="overflow-hidden rounded-3xl">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={true}
            interval={3000}
            transitionTime={1000}
            axis="horizontal"
          >
            <div className="h-full">
              <img
                src={CoverImg}
                alt="Cover Image 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="h-full">
              <img
                src={NotFoundImg}
                alt="Cover Image 2"
                className="object-cover w-full h-full"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
