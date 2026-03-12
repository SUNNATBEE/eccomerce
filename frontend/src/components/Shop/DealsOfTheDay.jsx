import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const DealCard = ({ deal }) => {
    const { addToCart } = useCart();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(deal.expiryDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            {/* Image Section */}
            <div className="relative h-[250px] overflow-hidden">
                <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Timer Overlay */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="bg-white/90 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center shadow-lg">
                            <div className="text-green-600 font-bold text-lg leading-none">{String(value).padStart(2, '0')}</div>
                            <div className="text-[10px] text-gray-500 uppercase font-medium mt-1">{unit}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 pt-4">
                <span className="text-xs font-medium text-gray-400 mb-1 block">By {deal.brand}</span>
                <h3 className="text-gray-800 font-bold text-base mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {deal.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                        <AiFillStar size={14} />
                    </div>
                    <span className="text-xs text-gray-400">({deal.rating.toFixed(1)})</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-green-600 font-bold text-xl">${deal.price}</span>
                        <span className="text-gray-400 line-through text-sm">${deal.oldPrice}</span>
                    </div>
                    <button
                        onClick={() => {
                            addToCart({
                                _id: deal.id,
                                name: deal.title,
                                price: deal.price,
                                image: deal.image,
                                category: deal.brand
                            });
                            toast.success(`${deal.title} added to cart!`);
                        }}
                        className="flex items-center gap-2 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 group/btn"
                    >
                        <HiOutlineShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DealsOfTheDay = () => {
    const deals = [
        {
            id: 1,
            title: "Seeds of Change Organic Quinoa, Brown",
            brand: "NestFood",
            price: 32.85,
            oldPrice: 33.8,
            rating: 4.0,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
            expiryDate: new Date(Date.now() + 426 * 24 * 60 * 60 * 1000),
        },
        {
            id: 2,
            title: "Perdue Simply Smart Organics Gluten",
            brand: "Old El Paso",
            price: 24.85,
            oldPrice: 26.8,
            rating: 4.0,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
            expiryDate: new Date(Date.now() + 822 * 24 * 60 * 60 * 1000),
        },
        {
            id: 3,
            title: "Signature Wood-Fired Mushroom",
            brand: "Progresso",
            price: 12.85,
            oldPrice: 13.8,
            rating: 3.0,
            image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500&q=80",
            expiryDate: new Date(Date.now() + 1156 * 24 * 60 * 60 * 1000),
        },
        {
            id: 4,
            title: "Simply Lemonade with Raspberry Juice",
            brand: "Yoplait",
            price: 15.85,
            oldPrice: 16.8,
            rating: 3.0,
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80",
            expiryDate: new Date(Date.now() + 398 * 24 * 60 * 60 * 1000),
        }
    ];

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Deals Of The Day</h2>
                <a href="#" className="flex items-center text-gray-500 hover:text-green-600 font-medium transition-colors group">
                    All Deals
                    <FiChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deals.map(deal => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </div>
        </section>
    );
};

export default DealsOfTheDay;
