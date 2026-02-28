/**
 * Contact.jsx - Aloqa sahifasi
 * ====================================================
 * VAZIFA: BOBUR
 * ====================================================
 *
 * Figma UI ga qarab Contact sahifasi quyidagi bo'limlardan iborat:
 *
 * 1. Breadcrumb        - Home > Contact
 * 2. ContactHero       - "Let us know how we can help you"
 *    - 4 ta box: Your Feedback | Billing Inquiries |
 *                Employee Services | General Inquiries
 * 3. MapSection        - Google Maps iframe
 * 4. OfficeCards       - Office | Studio | Shop manzillar
 * 5. ContactForm       - "Drop Us a Line" forma:
 *    - First Name, Last Name
 *    - Your Email, Subject (dropdown)
 *    - Your Message (textarea)
 *    - "Send message" tugmasi
 * 6. NewsletterBanner  - "Stay home & get your daily needs" (yashil)
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. ContactForm komponentini yarating (src/components/contact/ContactForm.jsx):
 *    - useState bilan forma holati boshqariladi
 *    - Validatsiya: bo'sh maydonlar, email format
 *    - API ga yuborish: sendContactForm() - services/api.js
 *    - Muvaffaqiyatli: toast.success() ko'rsating
 *    - Xatolik: toast.error() ko'rsating
 *
 *    Forma validatsiya namunasi:
 *    const [formData, setFormData] = useState({
 *      firstName: "", lastName: "", email: "",
 *      subject: "", message: ""
 *    });
 *    const handleSubmit = async (e) => {
 *      e.preventDefault();
 *      try {
 *        await sendContactForm(formData);
 *        toast.success("Xabaringiz yuborildi!");
 *      } catch (err) {
 *        toast.error("Xatolik yuz berdi!");
 *      }
 *    };
 *
 * 2. MapSection komponentini yarating (src/components/contact/MapSection.jsx):
 *    - Google Maps embed iframe
 *    - Toshkent markazini ko'rsating
 *
 * 3. OfficeCard komponentini yarating:
 *    - Ikon, tur (Office/Studio/Shop), manzil
 *    - "Get directions" link
 *
 * 4. ContactInfo - raqamlar, email manzillar
 *
 * API:
 * import { sendContactForm } from "../../services/api";
 *
 * DIQQAT: Faqat shu sahifa va src/components/contact/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import Breadcrumb from "../../components/shared/Breadcrumb";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Contact" }]} />

      {/* ===== 1. CONTACT HERO ===== */}
      <div className="my-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Let us know how we can help you
        </h1>
        {/* 4 ta yordam turi kartochkalari */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            "01. Your Feedback",
            "02. Billing Inquiries",
            "03. Employee Services",
            "04. General Inquiries",
          ].map((item) => (
            <div
              key={item}
              className="bg-gray-50 h-24 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm"
            >
              {item} (Bobur)
            </div>
          ))}
        </div>
      </div>

      {/* ===== 2. XARITA ===== */}
      {/* <MapSection /> */}
      <div className="my-6 bg-gray-200 h-64 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
        Google Maps iframe (Bobur)
      </div>

      {/* ===== 3. OFIS KARTOCHKALARI ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {["Office", "Studio", "Shop"].map((place) => (
          <div
            key={place}
            className="bg-gray-50 h-32 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed"
          >
            {place} kartochkasi (Bobur)
          </div>
        ))}
      </div>

      {/* ===== 4. FORMA ===== */}
      <div className="my-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Drop Us a Line
        </h2>
        {/* <ContactForm /> */}
        <div className="bg-gray-50 h-64 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
          Aloqa formasi: Ism, Familiya, Email, Xabar (Bobur)
          <br />
          sendContactForm() API funksiyasini ishlating!
        </div>
      </div>
    </div>
  );
};

export default Contact;
