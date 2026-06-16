import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plus, ArrowRight, ArrowUpRight, Send, Phone, MapPin, Check, Minus } from 'lucide-react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
  services: [
    {
      title: "ДИЗАЙН - ПРОЕКТЫ",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "РЕМОНТ",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "КОМПЛЕКТАЦИЯ",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"
    }
  ],
  approachBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  aboutImg: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
  avatars: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
  ],
  portfolio: [
    { title: "ЖК Золотой", area: "180 м²", img: "zolotoy_1.jpg" },
    { title: "ЖК Prime Park", area: "250 м²", img: "prime_park_1.jpg" },
    { title: "ЖК D1", area: "120 м²", img: "d1_1.png" },
    { title: "Усадьба", area: "400 м²", img: "usadba1.jpg" },
    { title: "Апартаменты Остоженка", area: "90 м²", img: "ostozhenka_1.png" },
    { title: "ЖК Headliner", area: "150 м²", img: "headliner_1.png" }
  ]
};

const PLANS = [
  { name: "ЭСКИЗНЫЙ", price: "от 3 500 ₽/м²", features: ["Планировочные решения", "Концепция (коллажи)", "ТЗ для строителей"] },
  { name: "РАБОЧИЙ", price: "от 5 500 ₽/м²", features: ["3D-визуализации", "Рабочие чертежи опытной группы", "Спецификации материалов"] },
  { name: "АВТОРСКИЙ НАДЗОР", price: "85 000 ₽/мес", features: ["Регулярные выезды", "Контроль реализации", "Еженедельные фотоотчёты"] },
  { name: "ПОД КЛЮЧ", price: "от 350 000 ₽/м²", features: ["Все стадии проектирования", "Ремонтно-отделочные работы", "Полная комплектация"] }
];

const FAQS = [
  { q: "СКОЛЬКО ВРЕМЕНИ ЗАНИМАЕТ РЕМОНТ?", a: "В среднем от 3 до 6 месяцев в зависимости от площади объекта, сложности проекта и выбранных материалов. График работ мы строго фиксируем в договоре." },
  { q: "МОЖНО ЗАКАЗАТЬ ТОЛЬКО ДИЗАЙН-ПРОЕКТ?", a: "Да, мы работаем по отдельным услугам. Вы можете заказать только дизайн-проект, а ремонт реализовать своими силами, либо заказать комплексный подход." },
  { q: "ЧТО ВХОДИТ В АВТОРСКИЙ НАДЗОР?", a: "Регулярные выезды на объект, контроль соответствия работ проекту, внесение корректировок в чертежи при необходимости, подбор аналогов материалов и еженедельные фотоотчёты для вас." },
  { q: "КАКАЯ ГАРАНТИЯ?", a: "Мы предоставляем гарантию 5 лет на все виды выполненных нами ремонтно-отделочных работ. Это условие официально закреплено в нашем договоре." }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, sourceName: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('honeypot')) return;
    
    setFormStatus('submitting');
    try {
      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        comment: formData.get('comment'),
        day: formData.get('preferredDay'),
        time: formData.get('preferredTime'),
        source: sourceName,
        url: window.location.href
      };
      await fetch('https://hook.eu1.make.com/puy2n5ltucpawv56c9mnocuyxt6txrdc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setFormStatus('success');
      e.currentTarget.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="font-sans text-[#2B2B2B] bg-[#F5F3ED] w-full min-h-screen overflow-x-hidden selection:bg-[#B8956A] selection:text-white">
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-6 px-6 md:px-12">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center text-[#2B2B2B] font-bold text-xl cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            М
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-white text-[13px] font-medium tracking-widest uppercase">
            <button onClick={() => scrollTo('services')} className="hover:text-[#B8956A] transition-colors">УСЛУГИ</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[#B8956A] transition-colors">О НАС</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-[#B8956A] transition-colors">НАШИ ПРОЕКТЫ</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-[#B8956A] transition-colors">ТАРИФЫ</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-[#B8956A] transition-colors">FAQ</button>
          </nav>
          
          <button onClick={() => scrollTo('contact')} className="hidden lg:block text-white text-[13px] font-medium tracking-widest uppercase hover:text-[#B8956A] transition-colors">
            КОНТАКТЫ
          </button>

          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#F5F3ED] p-6 flex flex-col">
            <div className="flex justify-between items-center mb-16">
              <div className="w-12 h-12 bg-[#2B2B2B] text-white rounded-[14px] flex items-center justify-center font-bold text-xl">М</div>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <nav className="flex flex-col gap-8 text-2xl font-medium tracking-wide uppercase">
              <button onClick={() => scrollTo('services')} className="text-left w-full border-b border-gray-300 pb-4">УСЛУГИ</button>
              <button onClick={() => scrollTo('about')} className="text-left w-full border-b border-gray-300 pb-4">О НАС</button>
              <button onClick={() => scrollTo('portfolio')} className="text-left w-full border-b border-gray-300 pb-4">НАШИ ПРОЕКТЫ</button>
              <button onClick={() => scrollTo('pricing')} className="text-left w-full border-b border-gray-300 pb-4">ТАРИФЫ</button>
              <button onClick={() => scrollTo('contact')} className="text-left w-full border-b border-gray-300 pb-4 text-[#B8956A]">ОБСУДИТЬ ПРОЕКТ</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden pb-12">
        <div className="absolute inset-0 bg-black z-0">
          <img src={IMAGES.hero} alt="Интерьер" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative z-10 text-center px-4 w-full max-w-5xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl lg:text-[140px] font-medium tracking-tighter lowercase mb-6">
            мечты<span className="text-[#B8956A] text-4xl lg:text-7xl align-top">®</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-sm md:text-lg lg:text-xl font-light tracking-wide max-w-2xl mx-auto uppercase">
            РЕМОНТ КВАРТИР И ДИЗАЙН ИНТЕРЬЕРА В МОСКВЕ И МОСКОВСКОЙ ОБЛАСТИ ПОД КЛЮЧ
          </motion.p>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section id="services" className="pt-32 pb-16 px-6 md:px-12 w-full max-w-[1600px] mx-auto rounded-t-[40px] -mt-[40px] bg-[#F5F3ED] relative z-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/4">
            <div className="text-sm tracking-widest text-gray-500 uppercase flex items-center gap-3">
              <span>[</span> комплексный подход <span>]</span>
            </div>
          </div>
          <div className="lg:w-3/4">
            <h2 className="text-3xl md:text-5xl lg:text-[42px] font-medium leading-[1.1] uppercase mb-8">
              ВСЕ УСЛУГИ ДЛЯ СОЗДАНИЯ ИДЕАЛЬНОГО ПРОСТРАНСТВА: <span className="text-gray-400">ОТ ПРОЕКТА ДО РЕМОНТА И ОСНАЩЕНИЯ ПОД КЛЮЧ</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
              Мы используем современные технологии, тщательно прорабатываем каждую деталь и предлагаем решения, которые сочетают функциональность, стиль и надежность, чтобы превзойти ваши ожидания. Выполним ремонт квартир в Москве и МО с нуля, создадим продуманный дизайн интерьера под ваш стиль и бюджет.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="pb-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {IMAGES.services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1 }} className="relative group overflow-hidden rounded-[30px] lg:rounded-[40px] aspect-[4/5] bg-gray-200 cursor-pointer">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/90 via-[#2B2B2B]/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex justify-between items-end">
                  <h3 className="text-white text-2xl lg:text-3xl font-medium tracking-wide">{s.title}</h3>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B2B2B] shrink-0 group-hover:bg-[#B8956A] group-hover:text-white transition-colors">
                    <Plus size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase hover:text-[#B8956A] transition-colors group">
            СМОТРЕТЬ ВСЕ
            <div className="w-12 h-12 bg-[#2B2B2B] text-white rounded-full flex items-center justify-center group-hover:bg-[#B8956A] transition-colors">
              <ArrowRight size={20} strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </section>

      {/* APPROACH */}
      <section className="w-full bg-[#2B2B2B] relative rounded-[40px] overflow-hidden lg:mx-auto max-w-[1800px]">
        <div className="absolute inset-0">
          <img src={IMAGES.approachBg} alt="Фон" className="w-full h-[60%] object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2B2B2B] h-[60%]"></div>
        </div>
        
        <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
          <h2 className="text-white text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-24 max-w-4xl uppercase">
            НАШ ПОДХОД К ДИЗАЙНЕРСКОМУ РЕМОНТУ КВАРТИР
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "УТВЕРЖДАЕМ ПОНЯТНУЮ СМЕТУ", desc: "Работы начинаются только после согласования сметы и заключения договора. Вы заранее знаете точный бюджет ремонта." },
              { title: "РАЗРАБАТЫВАЕМ ПРОЕКТ С УЧЕТОМ БЮДЖЕТА", desc: "Каждый дизайн-проект интерьера основывается на подборе оптимальных материалов и решений." },
              { title: "ВСЕ СПЕЦИАЛИСТЫ РАБОТАЮТ В СВЯЗКЕ", desc: "Над вашим проектом работает команда: дизайнер, ПМ, инженеры. Это гарантирует точность реализации." }
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#F5F3ED] rounded-[30px] lg:rounded-[40px] p-8 lg:p-12 flex flex-col h-full">
                <h3 className="text-2xl lg:text-3xl font-medium mb-8 uppercase leading-[1.2]">{step.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-16">{step.desc}</p>
                <div className="mt-auto flex justify-end text-sm text-gray-400 font-medium tracking-wider">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32">
          <div className="lg:w-1/4">
            <div className="text-sm tracking-widest text-[#B8956A] uppercase flex items-center gap-3">
              <span className="text-gray-500">[</span> о нас <span className="text-gray-500">]</span>
            </div>
          </div>
          <div className="lg:w-3/4">
            <h2 className="text-3xl md:text-5xl lg:text-[46px] font-medium leading-[1.2] uppercase mb-12 max-w-4xl">
              МЕЧТЫ — ЭТО НЕ «СДЕЛАЛИ-СДАЛИ». ЭТО ЦЕЛАЯ ЖИЗНЬ, КОТОРУЮ МЫ ПРОЖИВАЕМ С ЗАКАЗЧИКОМ.
            </h2>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg mb-12">
                  Мы — команда высококвалифицированных профессионалов с многолетним опытом, готовая взять на себя ремонт и дизайн домов и квартир под ключ в Москве и МО.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img src={IMAGES.aboutImg} alt="Команда" className="w-full rounded-[40px] lg:rounded-tl-[80px] lg:rounded-br-[80px] object-cover aspect-[4/3]" />
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 border-t border-[#E5E0D8] pt-16">
          <div className="border-b md:border-b-0 md:border-r border-[#E5E0D8] pb-16 md:pb-0 md:pr-24">
            <div className="text-[100px] md:text-[140px] leading-none font-light tracking-tighter mb-4 text-[#2B2B2B]">
              90<span className="text-6xl">%</span>
            </div>
            <p className="text-gray-600 font-light leading-relaxed max-w-sm">
              Наших клиентов приходят по рекомендации. Строгое соблюдение сроков и безупречное качество.
            </p>
          </div>
          <div>
            <div className="text-[100px] md:text-[140px] leading-none font-light tracking-tighter mb-4 text-[#2B2B2B]">
              250<span className="text-4xl tracking-widest font-medium uppercase ml-4 text-gray-500 align-middle">+ ПРОЕКТОВ</span>
            </div>
            <p className="text-gray-600 font-light leading-relaxed max-w-sm">
              Квартиры, пентхаусы и таунхаусы. Доверяя нам свой ремонт, вы выбираете надежность.
            </p>
          </div>
          <div className="border-t border-[#E5E0D8] pt-16">
            <div className="text-[100px] md:text-[140px] leading-none font-light tracking-tighter mb-4 text-[#2B2B2B] flex items-end">
              <span className="text-4xl mb-4 mr-2 text-gray-400">с</span>2015
            </div>
            <p className="text-gray-600 font-light leading-relaxed max-w-sm">
              Создаём эксклюзивные интерьеры и сопровождаем каждый проект на всех этапах до финального клининга.
            </p>
          </div>
          <div className="border-t border-[#E5E0D8] pt-16 flex flex-col justify-center">
            <h3 className="text-2xl lg:text-3xl font-medium mb-10 uppercase max-w-sm leading-[1.2]">
              УЗНАЙ БОЛЬШЕ О НАШЕЙ КОМАНДЕ
            </h3>
            <div className="flex items-center justify-between max-w-sm">
              <div className="flex -space-x-4">
                {IMAGES.avatars.map((avatar, i) => (
                  <img key={i} src={avatar} alt="Команда" className="w-[72px] h-[72px] rounded-full border-2 border-[#F5F3ED] object-cover grayscale" />
                ))}
              </div>
              <div className="w-[72px] h-[72px] rounded-full bg-[#2B2B2B] text-white flex items-center justify-center cursor-pointer hover:bg-[#B8956A] transition-colors">
                <ArrowRight size={24} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (Adapted to style) */}
      <section id="portfolio" className="py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-sm tracking-widest text-[#B8956A] uppercase flex items-center gap-3 mb-6">
              <span className="text-gray-500">[</span> проекты <span className="text-gray-500">]</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] uppercase">НАШИ РАБОТЫ</h2>
          </div>
          <button className="w-16 h-16 rounded-full border border-[#E5E0D8] flex items-center justify-center hover:bg-[#B8956A] hover:text-white hover:border-[#B8956A] transition-all">
            <ArrowUpRight size={28} strokeWidth={1}/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {IMAGES.portfolio.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[30px] lg:rounded-[40px] aspect-[4/3] bg-gray-200 mb-6">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="px-4">
                <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-6 group-hover:border-[#B8956A] transition-colors">
                  <h4 className="text-2xl font-medium uppercase">{p.title}</h4>
                  <span className="text-gray-500 text-sm tracking-widest uppercase">{p.area}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-white rounded-[40px] w-full px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] uppercase mb-6">ТАРИФЫ И УСЛУГИ</h2>
            <p className="text-gray-500 text-lg">Прозрачное ценообразование, понятное на первом этапе</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan, i) => (
              <div key={i} className="border border-[#E5E0D8] rounded-[30px] p-8 hover:border-[#B8956A] hover:shadow-2xl transition-all duration-500 flex flex-col bg-[#F5F3ED]/30 group">
                <h4 className="text-xl font-medium uppercase mb-6">{plan.name}</h4>
                <div className="text-3xl font-light text-[#B8956A] mb-10 pb-8 border-b border-[#E5E0D8]">{plan.price}</div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-4 text-sm font-light text-gray-600">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#B8956A] mt-2 shrink-0"></div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('contact')} className="w-full py-4 border border-[#2B2B2B] rounded-full font-medium tracking-widest text-sm uppercase hover:bg-[#B8956A] hover:border-[#B8956A] hover:text-white transition-all">
                  ВЫБРАТЬ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] uppercase mb-16 text-center">ЧАСТЫЕ ВОПРОСЫ</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <div key={i} className="border border-[#E5E0D8] bg-white rounded-[24px] overflow-hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 md:p-8 flex justify-between items-center text-left hover:text-[#B8956A] transition-colors">
                  <span className="text-lg md:text-xl font-medium uppercase pr-8 tracking-wide">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full border border-[#E5E0D8] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#B8956A] border-[#B8956A] text-white' : ''}`}>
                    <Minus size={20} strokeWidth={1.5} className={!isOpen ? 'rotate-90 transition-transform' : 'transition-transform'}/>
                    {!isOpen && <Minus size={20} strokeWidth={1.5} className="absolute" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8 pt-0 text-gray-500 font-light leading-relaxed max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA FORM */}
      <section id="contact" className="px-4 md:px-12 pb-12 w-full max-w-[1800px] mx-auto">
        <div className="bg-[#2B2B2B] rounded-[40px] lg:rounded-[60px] p-8 md:p-16 lg:p-24 text-white flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-medium uppercase leading-[1.1] mb-8">
              ОБСУДИМ ВАШ ПРОЕКТ?
            </h2>
            <p className="text-xl font-light text-gray-400 mb-12 max-w-md">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут для предварительной оценки.
            </p>
            <div className="flex flex-wrap gap-4 font-light">
              <a href="tel:+79055164466" className="flex items-center gap-3 border border-white/20 rounded-full px-6 py-3 hover:bg-[#B8956A] hover:border-[#B8956A] transition-colors">
                <Phone size={18} /> +7 (905) 516-44-66
              </a>
              <a href="mailto:hello@mechtygroup.ru" className="flex items-center gap-3 border border-white/20 rounded-full px-6 py-3 hover:bg-[#B8956A] hover:border-[#B8956A] transition-colors">
                <Send size={18} /> hello@mechtygroup.ru
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full bg-white/5 p-8 md:p-12 rounded-[30px] border border-white/10 backdrop-blur-sm">
            {formStatus === 'success' ? (
               <div className="text-center py-12">
                 <div className="w-20 h-20 bg-[#B8956A] rounded-full flex items-center justify-center mx-auto mb-6">
                   <Check size={32} className="text-white" strokeWidth={3} />
                 </div>
                 <h3 className="text-2xl font-medium uppercase mb-4">СПАСИБО ЗА ЗАЯВКУ!</h3>
                 <p className="text-gray-400 font-light">Мы перезвоним вам в ближайшее время.</p>
               </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, "Финальная форма")} className="flex flex-col gap-6">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <input required type="text" name="name" placeholder="ВАШЕ ИМЯ" className="bg-transparent border-b border-white/20 focus:border-[#B8956A] py-4 text-white placeholder-gray-500 font-light outline-none transition-all w-full text-lg uppercase" />
                
                <input required type="tel" name="phone" placeholder="ТЕЛЕФОН" className="bg-transparent border-b border-white/20 focus:border-[#B8956A] py-4 text-white placeholder-gray-500 font-light outline-none transition-all w-full text-lg uppercase" />
                
                <input type="text" name="comment" placeholder="КАКАЯ СТОИТ ЗАДАЧА?" className="bg-transparent border-b border-white/20 focus:border-[#B8956A] py-4 text-white placeholder-gray-500 font-light outline-none transition-all w-full text-lg uppercase" />
                
                <div className="mt-8 flex items-center gap-6">
                  <button type="submit" disabled={formStatus === 'submitting'} className="w-20 h-20 bg-[#B8956A] hover:bg-white hover:text-[#2B2B2B] rounded-full flex items-center justify-center shrink-0 transition-colors disabled:opacity-50 text-white">
                    <ArrowRight size={32} strokeWidth={1.5} />
                  </button>
                  <p className="text-xs text-gray-500 font-light uppercase tracking-widest leading-relaxed">
                    НАЖИМАЯ НА КНОПКУ, ВЫ СОГЛАШАЕТЕСЬ<br/>С ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 md:px-12 py-16 text-center text-sm text-gray-400 font-light uppercase tracking-widest border-t border-[#E5E0D8]/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1600px] mx-auto">
          <p>© {new Date().getFullYear()} МЕЧТЫ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#B8956A] transition-colors">TELEGRAM</a>
            <a href="#" className="hover:text-[#B8956A] transition-colors">VKONTAKTE</a>
          </div>
          <a href="#" className="hover:text-[#B8956A] transition-colors">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@200;300;400;500;600&display=swap');
        .font-sans { font-family: 'Montserrat', 'Inter', sans-serif; }
      `}} />
    </div>
  );
}

