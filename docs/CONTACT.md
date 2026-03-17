# 📞 Contact Page - Bobur

## Sen kim uchun ishlaysan?
**Bobur** - Aloqa sahifasi (Contact Page)

---

## 📍 Sening fayllaringiz

```
src/pages/Contact/Contact.jsx        ← Asosiy sahifa fayli
src/components/contact/
  ├── ContactHero.jsx                ← Yaratishing kerak
  ├── MapSection.jsx                 ← Yaratishing kerak
  ├── OfficeCard.jsx                 ← Yaratishing kerak
  └── ContactForm.jsx                ← Yaratishing kerak (ENG MUHIMI!)
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. ContactHero (Kirish sarlavha qismi)
**Ko'rinishi:** "Let us know how we can help you" + 4 ta yordam turi

```jsx
import { FiMessageSquare, FiDollarSign, FiUsers, FiHelpCircle } from "react-icons/fi";

const HELP_TYPES = [
  { icon: FiMessageSquare, num: "01", title: "Your Feedback", desc: "Fikr-mulohazalaringizni bildiring" },
  { icon: FiDollarSign, num: "02", title: "Billing Inquiries", desc: "To'lov masalalari bo'yicha" },
  { icon: FiUsers, num: "03", title: "Employee Services", desc: "Xodimlar bo'yicha savollar" },
  { icon: FiHelpCircle, num: "04", title: "General Inquiries", desc: "Umumiy savollar" },
];

const ContactHero = () => {
  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Let us know how we can help you
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HELP_TYPES.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.num} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <Icon size={20} className="text-green-500" />
              </div>
              <span className="text-xs text-gray-400">{item.num}</span>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

### 2. MapSection (Xarita)
**Ko'rinishi:** Google Maps iframe Toshkent markazini ko'rsatadi

```jsx
const MapSection = () => {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.791779895578!2d69.2787!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTYnNDMuMyJF!5e0!3m2!1suz!2suz!4v1234567890"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Nest Mart joylashuvi"
      />
    </div>
  );
};
```

### 3. OfficeCard (Ofis, Studio, Do'kon)
**Ko'rinishi:** 3 ta karta - har birida manzil va "Get directions" link

```jsx
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const OFFICES = [
  {
    type: "Office",
    address: "Amir Temur ko'chasi 123, Toshkent",
    phone: "(+998) 71 123-45-67",
    email: "office@nestmart.uz",
  },
  {
    type: "Studio",
    address: "Yunusabad tumani, 12-mavze",
    phone: "(+998) 71 234-56-78",
    email: "studio@nestmart.uz",
  },
  {
    type: "Shop",
    address: "Chilonzor tumani, Bunyodkor shoh yo'li",
    phone: "(+998) 71 345-67-89",
    email: "shop@nestmart.uz",
  },
];

const OfficeCard = ({ office }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-gray-800 text-lg mb-3">{office.type}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex gap-2">
          <FiMapPin className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
          <span>{office.address}</span>
        </div>
        <div className="flex gap-2">
          <FiPhone className="text-green-500 flex-shrink-0" size={14} />
          <span>{office.phone}</span>
        </div>
        <div className="flex gap-2">
          <FiMail className="text-green-500 flex-shrink-0" size={14} />
          <span>{office.email}</span>
        </div>
      </div>
      <a href="#" className="text-green-600 text-sm font-medium mt-3 inline-block hover:underline">
        Get directions →
      </a>
    </div>
  );
};
```

### 4. ContactForm (ASOSIY VAZIFA!)
**Ko'rinishi:** "Drop Us a Line" sarlavha + 6 maydonli forma

```jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { sendContactForm } from "../../services/api";

const SUBJECTS = [
  "Umumiy savol",
  "Buyurtma bo'yicha",
  "Shikoyat",
  "Hamkorlik",
  "Boshqa",
];

const ContactForm = () => {
  // Forma ma'lumotlari holati
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Forma yuborilmoqda holati
  const [loading, setLoading] = useState(false);
  // Xatoliklar holati
  const [errors, setErrors] = useState({});

  // Inputlar o'zgarganda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Xatolikni tozalash
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Validatsiya
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ism kiritish shart";
    if (!formData.lastName.trim()) newErrors.lastName = "Familiya kiritish shart";
    if (!formData.email.trim()) {
      newErrors.email = "Email kiritish shart";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email noto'g'ri formatda";
    }
    if (!formData.message.trim()) newErrors.message = "Xabar kiritish shart";
    return newErrors;
  };

  // Forma yuborilganda
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validatsiya tekshirish
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await sendContactForm(formData);
      toast.success("Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.");
      // Formani tozalash
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Ism va Familiya */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Ism <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ismingiz"
            className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors
                        ${errors.firstName ? "border-red-400" : "border-gray-300"}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Familiya <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Familiyangiz"
            className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors
                        ${errors.lastName ? "border-red-400" : "border-gray-300"}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email va Telefon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors
                        ${errors.email ? "border-red-400" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+998 90 123 45 67"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Mavzu */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Mavzu</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
        >
          <option value="">Tanlang...</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Xabar */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Xabar <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Xabaringizni yozing..."
          className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors resize-none
                      ${errors.message ? "border-red-400" : "border-gray-300"}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Yuborish tugmasi */}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
      >
        {loading ? "Yuborilmoqda..." : "Send message"}
      </button>
    </form>
  );
};
```

---

## 🔧 API ishlatish

```javascript
import { sendContactForm } from "../../services/api";

// Forma yuborilganda:
const response = await sendContactForm({
  firstName: "Bobur",
  lastName: "Toshmatov",
  email: "bobur@example.com",
  phone: "+998901234567",
  subject: "Umumiy savol",
  message: "Salom, savolim bor..."
});
```

---

## ✅ Tekshirish ro'yxati

- [ ] ContactHero - 4 ta help box ko'rinadi
- [ ] Google Maps xarita ko'rinadi
- [ ] 3 ta ofis kartochkasi ko'rinadi
- [ ] Forma - validatsiya ishlaydi
- [ ] Bo'sh maydon yuborishda xato ko'rinadi
- [ ] Forma yuborilganda toast xabar ko'rinadi
- [ ] API ga ma'lumot ketadi (Network tab dan tekshiring)
- [ ] Forma yuborilgandan keyin tozalanadi

---

## ⚠️ Muhim eslatmalar

1. Forma validatsiyasini E'TIBOR bering - bo'sh maydonlar qabul qilinmasin
2. `sendContactForm` funksiyasi `services/api.js` da tayyor
3. Muvaffaqiyatli yuborilganda `toast.success()` ishlating
4. Xatolikda `toast.error()` ishlating
