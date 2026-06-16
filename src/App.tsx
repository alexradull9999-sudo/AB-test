import React, { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Check, Plus, Minus, Send, ArrowRight, Instagram } from 'lucide-react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
  services: [
    {
      title: "Дизайн-проект",
      desc: "Индивидуальный проект с 3D-визуализацией",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Ремонт под ключ",
      desc: "Все этапы от демонтажа до клининга",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Комплектация",
      desc: "Подбор мебели, материалов, техники",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Авторский надзор",
      desc: "Контроль реализации проекта",
      img: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800"
    }
  ],
  approach: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  teamGroup: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
  teamMembers: [
    { name: "Анна", role: "Главный дизайнер", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: "Сергей", role: "Руководитель проектов", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
    { name: "Елена", role: "Арт-директор", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" },
    { name: "Михаил", role: "Инженер-архитектор", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
    { name: "Ольга", role: "Комплектатор", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" }
  ],
  portfolio: [
    { title: "ЖК Knightsbridge", area: "3-комн, 180 м²", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" },
    { title: "Пентхаус Москва-Сити", area: "250 м²", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" },
    { title: "ЖК Садовые кварталы", area: "120 м²", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
    { title: "Таунхаус Рублёвка", area: "400 м²", img: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800" },
    { title: "Апартаменты Остоженка", area: "90 м²", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
    { title: "Загородный дом", area: "600 м²", img: "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&q=80&w=800" }
  ]
};

const PLANS = [
  {
    name: "ЭСКИЗНЫЙ",
    price: "от 3 500 ₽/м²",
    features: ["Планировочные решения", "Концепция (коллажи)", "ТЗ для строителей"],
  },
  {
    name: "РАБОЧИЙ",
    price: "от 5 500 ₽/м²",
    features: ["3D-визуализации", "Рабочие чертежи опытной группы", "Спецификации материалов"],
  },
  {
    name: "АВТОРСКИЙ НАДЗОР",
    price: "85 000 ₽/мес",
    features: ["Регулярные выезды", "Контроль реализации", "Еженедельные фотоотчёты"],
  },
  {
    name: "ПОД КЛЮЧ",
    price: "от 350 000 ₽/м²",
    features: ["Все стадии проектирования", "Ремонтно-отделочные работы", "Полная комплектация"],
  }
];

const FAQS = [
  { q: "Сколько времени занимает ремонт?", a: "В среднем от 3 до 6 месяцев в зависимости от площади объекта, сложности проекта и выбранных материалов. График работ мы строго фиксируем в договоре." },
  { q: "Можно заказать только дизайн-проект?", a: "Да, мы работаем по отдельным услугам. Вы можете заказать только дизайн-проект, а ремонт реализовать своими силами, либо заказать комплексный подход." },
  { q: "Что входит в авторский надзор?", a: "Регулярные выезды на объект, контроль соответствия работ проекту, внесение корректировок в чертежи при необходимости, подбор аналогов материалов и еженедельные фотоотчёты для вас." },
  { q: "Какая гарантия?", a: "Мы предоставляем гарантию 5 лет на все виды выполненных нами ремонтно-отделочных работ. Это условие официально закреплено в нашем договоре." },
  { q: "Работаете ли за пределами Москвы?", a: "Да, мы выезжаем в Московскую область, а также рассматриваем масштабные проекты в других регионах по индивидуальной договоренности." }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [midFormStatus, setMidFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [finalFormStatus, setFinalFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleMidSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('honeypot')) return;
    
    setMidFormStatus('submitting');
    try {
      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        comment: formData.get('comment'),
        source: "Форма середины",
        url: window.location.href
      };
      await fetch('https://hook.eu1.make.com/puy2n5ltucpawv56c9mnocuyxt6txrdc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setMidFormStatus('success');
      e.currentTarget.reset();
    } catch {
      setMidFormStatus('error');
    }
  };

  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('honeypot')) return;
    
    setFinalFormStatus('submitting');
    try {
      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        preferredDay: formData.get('preferredDay'),
        preferredTime: formData.get('preferredTime'),
        comment: formData.get('comment'),
        source: "Финальная форма",
        url: window.location.href
      };
      await fetch('https://hook.eu1.make.com/puy2n5ltucpawv56c9mnocuyxt6txrdc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setFinalFormStatus('success');
      e.currentTarget.reset();
    } catch {
      setFinalFormStatus('error');
    }
  };

  return (
    <div className="font-sans text-[#1a1a1a] bg-[#FFFFFF] w-full min-h-screen overflow-x-hidden selection:bg-[#B8956A] selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-widest uppercase cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            МЕЧТЫ<span className="text-[#B8956A]">.</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
            <button onClick={() => scrollTo('services')} className="hover:text-[#B8956A] transition-colors">Услуги</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[#B8956A] transition-colors">О нас</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-[#B8956A] transition-colors">Проекты</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-[#B8956A] transition-colors">Тарифы</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-[#B8956A] transition-colors">FAQ</button>
          </nav>
          
          <div className="hidden lg:block">
            <button onClick={() => scrollTo('contact-mid')} className="bg-[#B8956A] hover:bg-[#a6865b] text-white px-6 py-3 font-semibold text-sm transition-colors duration-300">
              Обсудить проект
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 lg:hidden min-h-screen"
          >
            <nav className="flex flex-col gap-6 text-xl font-medium">
              <button onClick={() => scrollTo('services')} className="text-left py-2 border-b border-gray-100 uppercase tracking-wide">Услуги</button>
              <button onClick={() => scrollTo('about')} className="text-left py-2 border-b border-gray-100 uppercase tracking-wide">О нас</button>
              <button onClick={() => scrollTo('portfolio')} className="text-left py-2 border-b border-gray-100 uppercase tracking-wide">Проекты</button>
              <button onClick={() => scrollTo('pricing')} className="text-left py-2 border-b border-gray-100 uppercase tracking-wide">Тарифы</button>
              <button onClick={() => scrollTo('faq')} className="text-left py-2 border-b border-gray-100 uppercase tracking-wide">FAQ</button>
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <a href="tel:+79055164466" className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
                <Phone size={20} className="text-[#B8956A]" /> +7 (905) 516-44-66
              </a>
              <button onClick={() => scrollTo('contact-mid')} className="bg-[#B8956A] w-full text-white py-4 font-bold text-center mt-4 uppercase tracking-wide">
                Обсудить проект
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <img src={IMAGES.hero} alt="Интерьер премиум" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-white flex flex-col items-center text-center mt-12 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-block border border-white/30 backdrop-blur-md px-4 py-1 uppercase text-xs tracking-widest mb-8">
            Комплексный подход
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-5xl">
            Дизайн интерьеров и ремонт под ключ в Москве
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/90 max-w-3xl mb-12" style={{ textWrap: 'balance' } as any}>
            Создаём пространства мечты — от концепции до финального клининга. Премиальное качество, прозрачные сроки, гарантия 5 лет.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => scrollTo('portfolio')} className="bg-[#B8956A] hover:bg-[#a6865b] text-white px-8 py-4 font-semibold text-sm transition-colors duration-300 w-full sm:w-auto uppercase tracking-wide">
              Смотреть проекты
            </button>
            <button onClick={() => scrollTo('contact-mid')} className="border border-white hover:bg-white hover:text-[#1a1a1a] text-white px-8 py-4 font-semibold text-sm transition-colors duration-300 w-full sm:w-auto uppercase tracking-wide">
              Рассчитать стоимость
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="absolute bottom-12 flex gap-6 text-white/70">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center gap-2"><Send size={16}/> Telegram</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center gap-2">VK</a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 w-full max-w-7xl mx-auto px-4 md:px-8 bg-white">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl">
            Все услуги для создания идеального пространства
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {IMAGES.services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
              <div className="w-full aspect-[4/5] bg-gray-100 mb-6 overflow-hidden transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button onClick={() => scrollTo('contact-mid')} className="inline-flex items-center gap-2 text-[#B8956A] font-bold hover:gap-4 transition-all duration-300 uppercase tracking-wide">
            Оставить заявку на подбор услуг <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-24 md:py-32 bg-[#F8F8F8] w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
              Наш подход к дизайнерскому ремонту
            </motion.h2>
            <div className="space-y-8">
              {[
                { title: "Утверждаем понятную смету", desc: "Фиксированный бюджет до старта. Никаких скрытых платежей в процессе реализации." },
                { title: "Разрабатываем проект под ваш бюджет", desc: "Подбираем оптимальные чистовые материалы без переплат, строго в рамках выделенной суммы." },
                { title: "Все специалисты работают в связке", desc: "В вашем распоряжении команда: дизайнер, проектный менеджер (ПМ), инженеры и мастера." },
                { title: "Еженедельные фото и видеоотчёты", desc: "Вы всегда в курсе процесса. Прозрачная коммуникация в рабочем чате." },
                { title: "Гарантия на ремонт 5 лет", desc: "Всё официально и закреплено в договоре. Уверены в качестве на 100%." }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 items-start">
                  <div className="text-5xl text-[#B8956A] font-light leading-none shrink-0 w-10 mt-1">{i + 1}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <img src={IMAGES.approach} alt="Процесс работы" className="w-full h-full object-cover aspect-square shadow-2xl" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center">
            <span className="inline-block border border-gray-200 px-4 py-1 uppercase text-xs tracking-widest mb-6 font-semibold">О нас</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 max-w-4xl leading-tight">
              МЕЧТЫ — это не «сделали-сдали». Это целая жизнь, которую мы проживаем с заказчиком.
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mb-16 leading-relaxed">
              Студия «Все начинается с мечты» — место, где мечты о комфортном жилье воплощаются в реальность. Мы гордимся командой профессионалов с опытом от 10 лет, которая реализует объекты премиум класса любой сложности.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full mb-16">
            <img src={IMAGES.teamGroup} alt="Команда МЕЧТЫ" className="w-full aspect-[21/9] object-cover" loading="lazy" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-8 md:py-0">
              <div className="text-5xl font-bold text-[#B8956A] mb-2">90%</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide text-sm">Клиентов по рекомендации</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="py-8 md:py-0">
              <div className="text-5xl font-bold text-[#B8956A] mb-2">200+</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide text-sm">Успешных проектов</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="py-8 md:py-0">
              <div className="text-5xl font-bold text-[#B8956A] mb-2">2015</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide text-sm">Год основания студии</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {IMAGES.teamMembers.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                <div className="w-full aspect-square mb-4 overflow-hidden bg-gray-100">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MID FORM #1 */}
      <section id="contact-mid" className="py-24 bg-[#1a1a1a] text-white w-full">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Обсудим ваш проект?</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Оставьте заявку — мы ответим на вопросы, расскажем о процессах и дадим предварительную оценку стоимости и сроков.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://t.me/your_tg" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-medium">
                <Send size={18} /> Telegram
              </a>
              <a href="https://wa.me/79055164466" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-medium">
                <Phone size={18} /> WhatsApp
              </a>
              <a href="tel:+79055164466" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-medium">
                +7 (905) 516-44-66
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {midFormStatus === 'success' ? (
              <div className="h-full flex items-center justify-center p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                <div>
                  <div className="w-16 h-16 bg-[#B8956A] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Спасибо за заявку!</h3>
                  <p className="text-gray-400">Мы свяжемся с вами в течение 15 минут.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleMidSubmit} className="flex flex-col gap-4">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <input required type="text" name="name" placeholder="Ваше имя" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] focus:bg-[#333] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed" />
                
                <input required type="tel" name="phone" placeholder="Номер телефона" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] focus:bg-[#333] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed" />
                
                <textarea name="comment" placeholder="Какая стоит задача? (необязательно)" rows={3} className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] focus:bg-[#333] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full resize-none leading-relaxed" />
                
                <div className="mt-4 flex items-start gap-3">
                  <input required type="checkbox" id="policy1" className="mt-1.5 w-4 h-4 accent-[#B8956A]" />
                  <label htmlFor="policy1" className="text-sm text-gray-500">
                    Согласен(на) на обработку персональных данных
                  </label>
                </div>
                
                <button type="submit" disabled={midFormStatus === 'submitting'} className="bg-[#B8956A] hover:bg-[#a6865b] disabled:bg-[#a6865b]/50 text-white px-8 py-5 font-bold uppercase tracking-widest mt-4 transition-colors w-full">
                  {midFormStatus === 'submitting' ? 'Отправка...' : 'Оставить заявку'}
                </button>
                {midFormStatus === 'error' && <p className="text-red-400 text-sm mt-2">Произошла ошибка при отправке. Пожалуйста, попробуйте позже.</p>}
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32 bg-[#F8F8F8] w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center mb-16">
            <span className="inline-block border border-gray-300 px-4 py-1 uppercase text-xs tracking-widest mb-6 font-semibold">Наши проекты</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Наши воплощённые проекты</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {IMAGES.portfolio.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative group overflow-hidden cursor-pointer bg-gray-200">
                <div className="aspect-[4/3] w-full">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                    <p className="text-white/80 uppercase tracking-widest text-sm font-medium">{p.area}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-10 py-4 font-semibold text-sm transition-colors duration-300 uppercase tracking-widest inline-block">
              Все проекты
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 md:py-32 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Тарифы, созданные под ваш проект</h2>
          </motion.div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
            {PLANS.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center bg-white border border-gray-100 p-8 xl:p-10 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 shrink-0 flex flex-col h-full">
                <h4 className="font-bold tracking-widest text-xs text-gray-400 mb-4 uppercase">{plan.name}</h4>
                <div className="text-3xl font-bold text-[#B8956A] mb-8">{plan.price}</div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-4 text-sm font-medium leading-relaxed items-start">
                      <Check className="w-5 h-5 text-[#B8956A] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('contact-mid')} className="w-full py-4 border border-gray-200 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] font-semibold text-sm transition-colors duration-300 uppercase mt-auto">
                  Выбрать тариф
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-[#F8F8F8] w-full">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Часто задаваемые вопросы</h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-gray-200 bg-white">
                  <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-6 lg:p-8 text-left focus:outline-none bg-white">
                    <span className="text-lg md:text-xl font-bold pr-8">{faq.q}</span>
                    <span className="shrink-0 p-2 border border-gray-100 rounded-full bg-[#FAFAFA]">
                      {isOpen ? <Minus className="text-[#B8956A] w-5 h-5" /> : <Plus className="text-[#B8956A] w-5 h-5" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="p-6 lg:p-8 pt-0 text-gray-500 leading-relaxed border-t border-gray-50 mt-4 mx-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA FORM #2 */}
      <section className="py-24 md:py-32 bg-[#1a1a1a] text-white w-full">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Запишитесь на экскурсию по нашим объектам</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Приглашаем лично посетить наши объекты, увидеть процесс реализации собственными глазами и задать все вопросы инженерам и дизайнерам.
            </p>
            <div className="flex flex-col gap-6 font-medium">
              <a href="https://t.me/your_tg" className="flex items-center gap-4 hover:text-[#B8956A] hidden sm:flex transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                  <Send size={20} />
                </div>
                Написать в Telegram
              </a>
              <a href="https://wa.me/79055164466" className="flex items-center gap-4 hover:text-[#B8956A] hidden sm:flex transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                Написать в WhatsApp
              </a>
              <a href="tel:+79055164466" className="flex items-center gap-4 hover:text-[#B8956A] transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                Позвонить в бюро
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {finalFormStatus === 'success' ? (
              <div className="h-full flex items-center justify-center p-12 bg-white/5 border border-white/10 rounded-xl text-center">
                <div>
                  <div className="w-20 h-20 bg-[#B8956A] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Ждем встречи!</h3>
                  <p className="text-gray-400 text-lg">Заявка успешна. Мы свяжемся с вами для подтверждения времени экскурсии.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" name="name" placeholder="Имя" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed" />
                  <input required type="tel" name="phone" placeholder="Телефон" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="date" name="preferredDay" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed" />
                  <select required name="preferredTime" defaultValue="" className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full leading-relaxed appearance-none">
                    <option value="" disabled>Удобное время</option>
                    <option value="10-12">10:00 - 12:00</option>
                    <option value="12-14">12:00 - 14:00</option>
                    <option value="14-16">14:00 - 16:00</option>
                    <option value="16-18">16:00 - 18:00</option>
                    <option value="18-21">18:00 - 21:00</option>
                  </select>
                </div>
                
                <textarea name="comment" placeholder="Дополнительные пожелания к объекту" rows={3} className="bg-[#2a2a2a] border border-transparent focus:border-[#B8956A] px-6 py-4 text-white placeholder-gray-500 outline-none transition-all w-full resize-none leading-relaxed" />
                
                <div className="mt-4 flex items-start gap-3">
                  <input required type="checkbox" id="policy2" className="mt-1.5 w-4 h-4 accent-[#B8956A]" />
                  <label htmlFor="policy2" className="text-sm text-gray-500">
                    Согласен(на) на обработку персональных данных
                  </label>
                </div>
                
                <button type="submit" disabled={finalFormStatus === 'submitting'} className="bg-[#B8956A] hover:bg-[#a6865b] disabled:bg-[#a6865b]/50 text-white px-8 py-5 font-bold uppercase tracking-widest mt-4 transition-colors w-full">
                  {finalFormStatus === 'submitting' ? 'Отправка...' : 'Записаться на экскурсию'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1D1D1D] text-white/60 py-16 w-full border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="md:col-span-1">
            <div className="text-2xl font-black tracking-widest uppercase mb-6 text-white cursor-pointer select-none" onClick={() => window.scrollTo(0, 0)}>
              МЕЧТЫ<span className="text-[#B8956A]">.</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Студия дизайна интерьеров и ремонтов под ключ премиум-класса.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Навигация</h4>
            <nav className="flex flex-col gap-3 font-medium text-sm">
              <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors text-left">Услуги</button>
              <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors text-left">О нас</button>
              <button onClick={() => scrollTo('portfolio')} className="hover:text-white transition-colors text-left">Проекты</button>
              <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors text-left">Тарифы</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors text-left">FAQ</button>
            </nav>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Контакты</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a href="tel:+79055164466" className="hover:text-white transition-colors">+7 (905) 516-44-66</a>
              <a href="mailto:hello@mechtygroup.ru" className="hover:text-white transition-colors break-all">hello@mechtygroup.ru</a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#B8956A]" />
                <span>Москва, Сити, башня Империя</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Соцсети</h4>
            <div className="flex gap-4">
              <a href="https://t.me/your_tg" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B8956A] hover:border-[#B8956A] hover:text-white transition-all">
                <Send size={16} />
              </a>
              <a href="https://vk.com/your_vk" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B8956A] hover:border-[#B8956A] hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                VK
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} Студия «Все начинается с мечты». Все права защищены.</p>
          <a href="#" className="hover:text-white transition-colors text-center">Политика конфиденциальности</a>
        </div>
      </footer>

      {/* MOBILE BOTTOM CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center lg:hidden pb-safe">
        <a href="tel:+79055164466" className="text-[#1a1a1a] font-bold text-lg">
          +7 905 516 44 66
        </a>
        <button onClick={() => scrollTo('contact-mid')} className="bg-[#B8956A] hover:bg-[#a6865b] text-white px-6 py-2.5 font-bold uppercase text-xs tracking-widest transition-colors">
          Заявка
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
      `}} />
    </div>
  );
}
