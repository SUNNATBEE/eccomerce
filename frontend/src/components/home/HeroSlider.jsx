import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bgImg from "../home/public/996711b7439c5fa7fdc10fc886c447ab267a5fc1.png";

const slides = [
  {
    image: bgImg,
    title: "Fresh Vegetables",
    subtitle: "Big discount",
  },
  {
    image: bgImg,
    title: "Organic Products",
    subtitle: "Up to 50% Off",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop
        className="w-full h-[500px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[500px]">
              {/* Background */}
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {slide.title}
                </h1>

                <h2 className="text-3xl md:text-5xl font-semibold mt-2 text-green-400">
                  {slide.subtitle}
                </h2>

                <p className="mt-4 text-lg opacity-80">
                  Sign up for the daily newsletter
                </p>

                {/* Input */}
                <div className="mt-6 flex items-center bg-white/20 backdrop-blur-md rounded-full overflow-hidden shadow-xl border border-white/30">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-6 py-3 bg-transparent text-white placeholder-white/70 outline-none w-64 md:w-80"
                  />
                  <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-green-500 transition shadow-lg">
          <ChevronLeft className="text-white w-6 h-6" />
        </div>

        <div className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-green-500 transition shadow-lg">
          <ChevronRight className="text-white w-6 h-6" />
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSlider;