import React from 'react';
import { FiSend } from 'react-icons/fi';
import oka from '../../assets/banner-9.png.svg';
const NewsletterBanner = () => {
    return (
        <section className="px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-[#D8F1E5] rounded-3xl overflow-hidden min-h-[400px] flex items-center px-10 md:px-20">
                    {/* Background Pattern (Subtle overlay) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/food.png')` }}>
                    </div>

                    <div className="relative z-10 w-full md:w-1/2">
                        <h1 className="text-[32px] md:text-[42px] font-bold text-[#253D4E] leading-[1.2] mb-4">
                            Stay home & get your daily <br /> needs from our shop
                        </h1>
                        <p className="text-[18px] text-[#7E7E7E] mb-10">
                            Start You'r Daily Shopping with <span className="text-[#3BB77E] font-medium">Nest Mart</span>
                        </p>

                        <form className="relative flex items-center max-w-[450px]">
                            <div className="absolute left-6 text-gray-400">
                                <FiSend size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white pl-14 pr-36 py-5 rounded-full outline-none text-[#7E7E7E] text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 bg-[#3BB77E] hover:bg-[#2e9163] text-white px-10 py-5 rounded-full font-bold text-sm transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Delivery Man Image */}
                    <div className="absolute right-0 bottom-0 w-[45%] h-full pointer-events-none overflow-hidden flex items-end justify-end">
                        <img
                                    src={oka}
                                    alt="Delivery Man"
                                    className="w-full h-full object-contain object-bottom transition-opacity duration-300 opacity-20 md:opacity-100"
                            />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterBanner;
