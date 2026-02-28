# 📖 About Page - Ziyoda

## Sen kim uchun ishlaysan?
**Ziyoda** - Biz haqimizda sahifasi (About Page)

---

## 📍 Sening fayllaringiz

```
src/pages/About/About.jsx            ← Asosiy sahifa fayli
src/components/about/
  ├── AboutHero.jsx                  ← Yaratishing kerak
  ├── ServiceCard.jsx                ← Yaratishing kerak
  ├── PartnerSection.jsx             ← Yaratishing kerak
  ├── StatsCounter.jsx               ← Yaratishing kerak
  └── TeamCard.jsx                   ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. AboutHero (Kirish qismi)
**Ko'rinishi:** Chap: ayol rasmi, O'ng: "Welcome to Nest" matn + kichik rasmlar

```jsx
const AboutHero = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 my-8">
      {/* Chap: Asosiy rasm */}
      <div className="flex-1">
        <img src="/about-hero.jpg" alt="About" className="w-full rounded-lg" />
        {/* Kichik rasmlar qatori */}
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map(i => (
            <img key={i} src={`/about-thumb-${i}.jpg`} alt="" className="w-24 h-20 object-cover rounded" />
          ))}
        </div>
      </div>

      {/* O'ng: Matn */}
      <div className="flex-1">
        <p className="text-green-600 text-sm font-medium mb-2">About our store</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Nest</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          Nest boshqa elektron tijorat do'konlaridan farqli o'laroq,
          faqat eng sifatli va yangi mahsulotlarni taqdim etadi...
        </p>
        <p className="text-gray-600 leading-relaxed">
          Biz Toshkentda 2018 yildan beri ishlayapmiz va
          100,000 dan ortiq mijozga xizmat ko'rsatganmiz...
        </p>
      </div>
    </div>
  );
};
```

### 2. ServiceCard (6 ta xizmat)
**Ko'rinishi:** 6 ta karta - har birida ikon, sarlavha, tavsif, "Read More"

```jsx
import { FiTag, FiGrid, FiTruck, FiRefreshCw, FiThumbsUp, FiGift } from "react-icons/fi";

const SERVICES = [
  { icon: FiTag, title: "Best Prices & Offers", desc: "Biz eng qulay narxlarni taklif etamiz..." },
  { icon: FiGrid, title: "Wide Assortment", desc: "1000 dan ortiq mahsulot turini topasiz..." },
  { icon: FiTruck, title: "Free Delivery", desc: "50,000 so'mdan yuqori xaridlarda bepul yetkazamiz..." },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30 kun ichida qaytarish imkoniyati..." },
  { icon: FiThumbsUp, title: "100% Satisfaction", desc: "Mijozlar qoniqishi bizning ustuvorligimiz..." },
  { icon: FiGift, title: "Great Daily Deal", desc: "Har kuni yangi chegirmalar va takliflar..." },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow text-center">
      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-green-500" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">{service.desc}</p>
      <a href="#" className="text-green-600 text-sm font-medium hover:underline">
        Read More
      </a>
    </div>
  );
};

// Ishlatilishi:
// <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//   {SERVICES.map(s => <ServiceCard key={s.title} service={s} />)}
// </div>
```

### 3. StatsCounter (Raqamli statistika)
**Ko'rinishi:** Yashil fon, oq raqamlar, animatsiya bilan 0 dan oshadi

```jsx
import { useState, useEffect, useRef } from "react";

// Raqam animatsiyasi uchun custom hook
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
  };

  return { count, start };
};

const STATS = [
  { label: "Glorious years", value: 15 },
  { label: "Happy clients", value: 8600 },
  { label: "Projects complete", value: 700 },
  { label: "Team advisor", value: 80 },
  { label: "Products Sold", value: 12000 },
];

const StatsCounter = () => {
  // Intersection Observer - element ko'ringanda animatsiya boshlaydi
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-green-600 rounded-xl py-10 px-6 my-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-white">
        {STATS.map(stat => (
          <div key={stat.label}>
            <div className="text-4xl font-bold">
              {visible ? stat.value.toLocaleString() : 0}+
            </div>
            <p className="text-green-100 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 4. TeamCard (Jamoa a'zolari)
**Ko'rinishi:** Rasm + ism + lavozim + ijtimoiy tarmoqlar

```jsx
import { FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";

const TeamCard = ({ member }) => {
  return (
    <div className="text-center group">
      {/* Rasm */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img src={member.photo} alt={member.name} className="w-full h-56 object-cover" />
        {/* Hover da ijtimoiy tarmoqlar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-3 flex justify-center gap-3
                        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <a href={member.facebook} className="text-white hover:text-green-400">
            <FiFacebook size={18} />
          </a>
          <a href={member.twitter} className="text-white hover:text-green-400">
            <FiTwitter size={18} />
          </a>
          <a href={member.linkedin} className="text-white hover:text-green-400">
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
      <h3 className="font-semibold text-gray-800">{member.name}</h3>
      <p className="text-sm text-gray-500">{member.position}</p>
    </div>
  );
};
```

---

## ✅ Tekshirish ro'yxati

- [ ] AboutHero - rasm va matn ko'rinadi
- [ ] 6 ta service karta ko'rinadi
- [ ] StatsCounter - animatsiya ishlaydi
- [ ] Jamoa a'zolari ko'rinadi
- [ ] Breadcrumb ishlaydi
- [ ] Mobil responsive ishlaydi

---

## ⚠️ Muhim eslatmalar

1. Faqat `src/pages/About/` va `src/components/about/` papkalarini o'zgartiring
2. Breadcrumb ni tayyor komponentdan oling: `import Breadcrumb from "../../components/shared/Breadcrumb"`
3. StatsCounter da animatsiya uchun `useEffect` va `setInterval` ishlating
