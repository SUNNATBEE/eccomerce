// ShopByCategorySlider.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import first from "../home/public/alt (3).svg";
import second from "../home/public/alt (4).svg";
import third from "../home/public/alt (5).svg";
import forth from "../home/public/alt (6).svg";
import fifth from "../home/public/alt (7).svg";
import six from "../home/public/alt (8).svg";
import seven from "../home/public/alt (9).svg";
import eight from "../home/public/alt (10).svg";

const items = [
  { id: 1, img: first, title: "Milks and Dairies", count: 5 },
  { id: 2, img: second, title: "Milks and Dairies", count: 4 },
  { id: 3, img: third, title: "Milks and Dairies", count: 4 },
  { id: 4, img: forth, title: "Milks and Dairies", count: 2 },
  { id: 5, img: fifth, title: "Packaged fast food", count: 11 },
  { id: 6, img: six, title: "Baking material", count: 11 },
  { id: 7, img: seven, title: "Vegetables & tubers", count: 6 },
  { id: 8, img: eight, title: "Fresh Seafood", count: 5 },
];

const ShopByCategorySlider = () => {
  const sliderRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // update disabled state based on scroll position
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => {
      setCanScrollPrev(el.scrollLeft > 0);
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    // initial check
    onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleScroll = (direction = 1) => {
    const el = sliderRef.current;
    if (!el) return;

    // width of one visible card (we show 5 cards), so slide by one card
    const cardWidth = el.clientWidth / 5;
    const scrollAmount = cardWidth * direction;

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-5">
      <div className="max-w-[1240px] w-full mx-auto px-4">
        {/* Header with title, "All Categories", and buttons on the right */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#253D4E] font-bold text-[32px]">Shop by Categories</h2>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-[#3BB77E] font-normal text-[16px]">
              All Categories <FaChevronRight />
            </button>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll(-1)}
                disabled={!canScrollPrev}
                aria-label="Scroll left"
                className={`p-2 rounded-md border transition disabled:opacity-40 disabled:cursor-not-allowed ${
                  canScrollPrev ? "hover:bg-gray-100" : "bg-white"
                }`}
              >
                <FaChevronLeft className="text-[#253D4E]" />
              </button>

              <button
                onClick={() => handleScroll(1)}
                disabled={!canScrollNext}
                aria-label="Scroll right"
                className={`p-2 rounded-md border transition disabled:opacity-40 disabled:cursor-not-allowed ${
                  canScrollNext ? "hover:bg-gray-100" : "bg-white"
                }`}
              >
                <FaChevronRight className="text-[#253D4E]" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-6 ">
          <ul
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {items.map((it) => (
              <li
                key={it.id}
                className="flex-shrink-0 basis-[20%] px-1" /* 5 items visible: 20% each */
              >
                <div className="rounded-[10px] py-3 flex flex-col gap-3 items-center justify-center bg-[#F4F6FA] border border-[#F4F6FA]">
                  <img src={it.img} alt={it.title} className="w-20 h-20 object-contain" />
                  <span className="w-[100px] flex flex-col items-center justify-center">
                    <p className="text-[#253D4E] font-bold text-[16px] text-center">{it.title}</p>
                    <p className="text-[#7E7E7E] font-normal text-[16px] text-center">{it.count} items</p>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategorySlider;