import React from 'react';
import Breadcrumb from "../../components/shared/Breadcrumb";

const About = () => {

  const services = [
    { id: 1, title: "Best Prices & Offers", img: "/best.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
    { id: 2, title: "Wide Assortment", img: "/wide.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
    { id: 3, title: "Free Delivery", img: "/free.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
    { id: 4, title: "Easy Returns", img: "/easy.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
    { id: 5, title: "100% Satisfaction", img: "/100.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
    { id: 6, title: "Great Daily Deal", img: "/great.png", desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: "About" }]}/>

      <section className='flex flex-col md:flex-row items-center gap-12 mt-10 mb-[60px]'>
        <div className='flex-1 flex flex-col items-center'>
          <img src="/women.png" alt="women" className='w-full max-w-[480px] h-auto rounded-2xl shadow-sm'/>
        </div>
        <div className='flex-1'>
          <h2 className='text-4xl font-bold text-gray-700 mb-6'>Welcome to Nest</h2>
          <div className='text-gray-500 space-y-6 leading-relaxed max-w-[600px]'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ius ferri velit sanctus cu, sed at soleat accusata. Dictas prompta et Ut placerat legendos interpre.</p>
          </div>
          <div className='mt-10'>
            <img className='w-full max-w-[550px] h-auto object-contain' src="/Section.png" alt="section"/>
          </div>
        </div>
      </section>

      <div className="my-16">
        <div className="flex justify-center mb-10">
           <img src="/110.png" alt="110" className="max-w-full h-auto"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((item) => (
            <div key={item.id} className="bg-white p-8 flex flex-col items-center text-center rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="mb-5 transform group-hover:scale-110 transition-transform">
                <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
              </div>
              <span className="font-bold text-xl text-gray-800 mb-3">{item.title}</span>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
              <button className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors cursor-pointer">Read More</button>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center min-h-[600px] gap-12 px-6 py-12'>
        <div className='flex-1 flex justify-center md:justify-end'>
          <img src="/perfomance.png" alt="performance" className='max-w-[1000px] w-full lg:w-[550px] h-auto rounded-3xl shadow-lg'/>
        </div>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <span className='text-gray-400 text-sm font-bold uppercase tracking-widest mb-3'>Our performance</span>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 max-w-[500px] leading-tight mb-8'>Your Partner fore <br/> e-commerce grocery</h1>
          <div className='text-gray-500 space-y-5 text-lg max-w-[550px] leading-relaxed'>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            <p>Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between items-start text-gray-500 text-lg leading-relaxed gap-10 mb-20'>
        <div className='flex-1'>
          <h1 className='text-gray-800 font-semibold'>Who we are</h1>
          <p>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.</p>
        </div>
        <div className='flex-1'>
          <h1 className='text-gray-800 font-semibold'>Our history</h1>
          <p>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.</p>
        </div>
        <div className='flex-1'>
          <h1 className='text-gray-800 font-semibold'>Our mission</h1>
          <p>Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.</p>
        </div>
      </div>

      <div>
        <div>
          <img src="/Main.png" alt="main" className="w-full"/>
        </div>
        <div className='flex justify-center mb-10 mt-16'>
          <img className='max-w-full h-auto' src="/our.png" alt="our" />
        </div>
        <div className="container mx-auto px-4 my-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <p className='text-green-800 font-semibold mb-2'>Our Team</p>
            <h2 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">Meet Our Expert <br/> Team</h2>
            <div className='text-gray-500 text-lg'>
              <p className='mb-6'>Proin ullamcorper pretium orci. Donec necscele risque leo. Nam massa dolor imperdiet neccon sequata congue idsem.</p>
              <button className='bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-md active:scale-95'>
                View All Members
              </button>
            </div>
          </div>
          <div className="lg:w-2/3 flex flex-row gap-6 items-start">
            <div className="relative flex-1 group">
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img src="/women2.png" alt="H. Merinda" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl p-4 w-[85%] text-center">
                <img src="/women(2).png" alt="info" className="w-full h-auto"/>
              </div>
            </div>
            <div className="relative flex-1 group">
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img src="/women3.png" alt="Dilan Specter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl p-4 w-[85%] text-center">
                <img src="/women(3).png" alt="info" className="w-full h-auto"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='mb-20 mt-35'>
        <img src="/Footer.png" alt="footer"/>
      
      </footer>

    </div>
  );
};

export default About