/**
 * About.jsx - Biz haqimizda sahifasi
 * ====================================================
 * VAZIFA: ZIYODA
 * ====================================================
 *
 * Figma UI ga qarab About sahifasi quyidagi bo'limlardan iborat:
 *
 * 1. Breadcrumb         - Home > About
 * 2. AboutHero          - Katta rasm + matn (Welcome to Nest)
 * 3. WhatWeProvide      - 6 ta xizmat kartochkasi (ikonlar bilan)
 *    - Best Prices & Offers
 *    - Wide Assortment
 *    - Free Delivery
 *    - Easy Returns
 *    - 100% Satisfaction
 *    - Great Daily Deal
 * 4. PartnerSection     - "Your Partner for e-commerce grocery solution" + rasm
 * 5. StatsCounter       - 0+ Glorious years, Happy clients, Projects complete...
 * 6. OurTeam            - "Meet Our Expert Team" - jamoa a'zolari kartochkalari
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. Breadcrumb komponentini import qiling:
 *    import Breadcrumb from "../../components/shared/Breadcrumb";
 *    <Breadcrumb items={[{ label: "About" }]} />
 *
 * 2. AboutHero komponentini yarating (src/components/about/AboutHero.jsx):
 *    - Chap: rasm (woman in apron)
 *    - O'ng: "Welcome to Nest" sarlavha + 2 ta paragraf matn
 *    - Kichik rasmlar gallereyasi pastda
 *
 * 3. ServiceCard komponentini yarating (src/components/about/ServiceCard.jsx):
 *    - Ikon (react-icons dan)
 *    - Sarlavha
 *    - Qisqacha tavsif
 *    - "Read More" link
 *    6 ta karta grid shaklida ko'rsating
 *
 * 4. StatsCounter komponentini yarating:
 *    - Raqamlar animatsiya bilan oshadi (useState, useEffect)
 *    - Masalan: 0 → 15 ga sekin oshadi
 *    - Ko'rinish: Yashil fon, oq raqamlar
 *
 * 5. TeamCard komponentini yarating:
 *    - Rasm, ism, lavozim
 *    - Ijtimoiy tarmoq ikonlari
 *
 * API ISHLATISH NAMUNASI:
 * // Kelajakda jamoa a'zolarini API dan olish uchun:
 * // import { getTeamMembers } from "../../services/api";
 *
 * DIQQAT: Faqat shu sahifa va src/components/about/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import Breadcrumb from "../../components/shared/Breadcrumb";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb navigatsiya */}
      <Breadcrumb items={[{ label: "About" }]} />

      {/* ===== 1. ABOUT HERO ===== */}
      {/* <AboutHero /> */}
      <div className="my-6 bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
        About Hero: Rasm + "Welcome to Nest" matn (Ziyoda)
      </div>

      {/* ===== 2. WHAT WE PROVIDE ===== */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          What We Provide?
        </h2>
        {/* <ServiceCards /> */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[
            "Best Prices & Offers",
            "Wide Assortment",
            "Free Delivery",
            "Easy Returns",
            "100% Satisfaction",
            "Great Daily Deal",
          ].map((service) => (
            <div
              key={service}
              className="bg-gray-50 h-32 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm"
            >
              {service} (Ziyoda)
            </div>
          ))}
        </div>
      </div>

      {/* ===== 3. PARTNER SECTION ===== */}
      {/* <PartnerSection /> */}
      <div className="my-8 bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
        Partner Section: "Your Partner for e-commerce grocery" (Ziyoda)
      </div>

      {/* ===== 4. STATS COUNTER ===== */}
      {/* <StatsCounter /> */}
      <div className="my-8 bg-green-600 h-24 flex items-center justify-center text-white rounded-lg">
        Stats: 0+ Glorious years | Happy clients | Projects | Team | Products
        (Ziyoda)
      </div>

      {/* ===== 5. OUR TEAM ===== */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Meet Our Expert Team
        </h2>
        {/* <TeamCards /> */}
        <div className="bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed mt-4">
          Jamoa a'zolari kartochkalari (Ziyoda)
        </div>
      </div>
    </div>
  );
};

export default About;
