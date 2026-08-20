import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Magnet = ({ children, padding = 150, strength = 3 }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (Math.abs(distanceX) < width / 2 + padding && Math.abs(distanceY) < height / 2 + padding) {
      setIsActive(true);
      setPosition({ x: distanceX / strength, y: distanceY / strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} style={{ perspective: 400 }} className="inline-block relative z-10">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={isActive ? { type: "tween", ease: "easeOut", duration: 0.3 } : { type: "tween", ease: "easeInOut", duration: 0.6 }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ContactButton = () => (
  <button className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest outline outline-2 outline-white outline-offset-[-3px] relative z-20"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset'
    }}>
    Contact Me
  </button>
);

const LiveProjectButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA] hover:bg-opacity-10 transition-colors">
    Live Project
  </button>
);

const AnimatedText = ({ text }: { text: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.8', 'end 0.2']
  });

  return (
    <p ref={container} className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]">
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = start + (1 / text.length);
        return <AnimatedChar key={i} char={char} progress={scrollYProgress} range={[start, end]} />
      })}
    </p>
  );
};

const AnimatedChar = ({ char, progress, range }: any) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
};

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col overflow-x-clip relative">
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center">
        <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i'm irshad
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            a digital creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3}>
          <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" alt="Portrait" className="w-full object-contain pointer-events-none" />
        </Magnet>
      </FadeIn>
    </section>
  );
};

const MarqueeSection = () => {
  const { scrollY } = useScroll();
  const row1X = useTransform(scrollY, (y) => (y - 200) * 0.3);
  const row2X = useTransform(scrollY, (y) => -(y - 200) * 0.3);

  const images = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const row1 = [...images.slice(0, 11), ...images.slice(0, 11), ...images.slice(0, 11)];
  const row2 = [...images.slice(11), ...images.slice(11), ...images.slice(11)];

  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      <motion.div style={{ x: row1X, willChange: 'transform' }} className="flex gap-3 whitespace-nowrap min-w-max">
        {row1.map((src, i) => (
          <img key={i} src={src} className="w-[420px] h-[270px] rounded-2xl object-cover" loading="lazy" />
        ))}
      </motion.div>
      <motion.div style={{ x: row2X, willChange: 'transform' }} className="flex gap-3 whitespace-nowrap min-w-max">
        {row2.map((src, i) => (
          <img key={i} src={src} className="w-[420px] h-[270px] rounded-2xl object-cover" loading="lazy" />
        ))}
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <FadeIn delay={0.1} x={-80} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
          About me
        </h2>
      </FadeIn>

      <div className="mb-16 sm:mb-20 md:mb-24 z-10">
        <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
      </div>

      <div className="z-10">
        <ContactButton />
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { num: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
    { num: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
    { num: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
    { num: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
    { num: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." }
  ];

  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Services
      </h2>
      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((svc, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex items-center gap-8 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)]">
              <span className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] w-1/4 shrink-0">{svc.num}</span>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">{svc.name}</h3>
                <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60 text-[#0C0C0C]">
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, totalCards }: any) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32" style={{ top: `calc(6rem + ${index * 28}px)` }}>
      <motion.div ref={cardRef} style={{ scale, transformOrigin: 'top center' }} className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="flex justify-between items-start mb-6 sm:mb-10">
          <div>
            <h3 className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">{project.num}</h3>
            <p className="uppercase text-lg sm:text-xl text-[#D7E2EA] mt-4">{project.category}</p>
            <h4 className="text-2xl sm:text-4xl font-bold mt-1 sm:mt-2 text-white">{project.name}</h4>
          </div>
          <div className="hidden sm:block">
            <LiveProjectButton />
          </div>
        </div>
        <div className="flex gap-4 flex-1 overflow-hidden">
          <div className="w-[40%] flex flex-col gap-4">
            <img src={project.img1} className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px] h-[clamp(130px,16vw,230px)]" />
            <img src={project.img2} className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px] h-[clamp(160px,22vw,340px)]" />
          </div>
          <div className="w-[60%] h-full">
            <img src={project.img3} className="w-full h-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = [
    { num: "01", category: "Client", name: "Nextlevel Studio", 
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85" },
    { num: "02", category: "Personal", name: "Aura Brand Identity", 
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85" },
    { num: "03", category: "Client", name: "Solaris Digital", 
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85" }
  ];

  return (
    <section className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 pb-40 px-5 sm:px-8 md:px-10">
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] pt-20 pb-10">
        Project
      </h2>
      <div className="relative">
        {projects.map((proj, i) => (
          <ProjectCard key={i} project={proj} index={i} totalCards={projects.length} />
        ))}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="w-full bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
