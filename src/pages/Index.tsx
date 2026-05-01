import heroImg from "@/assets/aerofreez-real.png";
import detailImg from "@/assets/aerofreez-detail.jpg";
import bottlesImg from "@/assets/aerofreez-bottles.jpg";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-dvh bg-sand text-ink overflow-x-hidden">
      {/* NAV */}
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="font-sans uppercase tracking-[0.2em] text-sm font-semibold">
          AeroFreez<sup className="text-[0.6em] ml-0.5">™</sup>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-ink/70">
          <a href="#proceso" className="hover:text-ink transition-colors">Proceso</a>
          <a href="#monitor" className="hover:text-ink transition-colors">Monitor</a>
          <a href="#galeria" className="hover:text-ink transition-colors">Galería</a>
          <a href="#testimonios" className="hover:text-ink transition-colors">Testimonios</a>
          <a href="#contacto" className="hover:text-ink transition-colors">Contacto</a>
        </div>
        <Button size="lg" className="rounded-full bg-ink text-sand hover:bg-ink/90 px-7 h-12 text-sm">
          Solicitar instalación
        </Button>
      </nav>

      {/* HERO */}
      <header className="px-6 md:px-12 pt-20 md:pt-28 pb-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center gap-10 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
            AeroFreez™ — Eco-Engineering Solutions
          </span>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-[8.5rem] leading-[0.95] tracking-tight text-balance max-w-6xl">
            Enfría tu hogar, <span className="italic text-sage">refresca</span> al planeta.
          </h1>
          <p className="font-light text-xl md:text-2xl text-ink/70 max-w-[54ch] leading-relaxed text-pretty">
            AeroFreez es un panel de ventilación pasiva fabricado con botellas PET
            recicladas, montadas sobre un marco de madera. Reduce hasta <strong className="font-medium text-ink">6 °C</strong> la
            temperatura interior — sin electricidad, sin ruido, sin huella.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="rounded-full bg-ink text-sand hover:bg-ink/90 h-16 px-10 text-base">
              Quiero uno en mi casa
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-ink/20 hover:bg-mint/30 h-16 px-10 text-base">
              Cómo funciona
            </Button>
          </div>
        </div>

        <div className="bg-blush rounded-[3rem] p-2 md:p-3 shadow-card relative">
          <img
            src={heroImg}
            alt="Panel AeroFreez™ instalado en una ventana, junto al monitor de validación térmica en tiempo real"
            className="w-full aspect-[16/9] object-cover rounded-[2.6rem]"
          />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-sand/95 backdrop-blur-md p-5 md:p-6 rounded-3xl max-w-xs">
            <div className="text-xs uppercase tracking-widest text-ink/60 mb-2">
              Instalación real
            </div>
            <div className="font-serif text-lg md:text-xl leading-snug">
              Marco de madera + 60 botellas PET aprovechando el efecto Bernoulli.
            </div>
          </div>
        </div>
      </header>

      {/* PROCESO */}
      <section id="proceso" className="bg-mint/40 rounded-t-[4rem] py-32 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-8">
              <span className="text-xs uppercase tracking-[0.25em] text-ink/60">
                ¿Cómo funciona?
              </span>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
                Física simple, <span className="italic text-sage">resultados reales.</span>
              </h2>
              <p className="text-lg text-ink/75 leading-relaxed max-w-[42ch] text-pretty">
                El aire caliente del exterior entra por la boca ancha de cada
                botella y se acelera al pasar por el cuello más estrecho. Esa
                aceleración baja la presión y enfría la corriente antes de
                liberarla en el interior. Es el principio de Bernoulli puesto al
                servicio del confort doméstico.
              </p>

              <div className="flex flex-col gap-8 mt-6">
                {[
                  { t: "Botellas recolectadas", d: "Recuperamos botellas PET de la comunidad y las lavamos a fondo." },
                  { t: "Ensamble manual", d: "Se cortan y encajan en un marco de madera, formando una rejilla aerodinámica." },
                  { t: "Instalación en ventana", d: "El panel reemplaza al vidrio o se monta sobre él. Cero consumo eléctrico." },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <span className="font-serif text-3xl text-sage tabular-nums shrink-0 mt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-base uppercase tracking-widest font-medium mb-2">
                        {step.t}
                      </h4>
                      <p className="text-ink/70 max-w-[36ch]">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-5">
              <div className="bg-sky rounded-[2.5rem] aspect-square p-2 shadow-soft">
                <img
                  src={bottlesImg}
                  alt="Botellas PET recuperadas listas para ser ensambladas"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[2.2rem] mix-blend-multiply"
                />
              </div>
              <div className="bg-blush rounded-[2.5rem] aspect-square p-2 mt-16 shadow-soft">
                <img
                  src={detailImg}
                  alt="Detalle del entramado de botellas del panel AeroFreez"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[2.2rem] mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONITOR EN TIEMPO REAL */}
      <section id="monitor" className="py-32 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-8">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Validación térmica en tiempo real
            </span>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
              Mide el frescor desde tu <span className="italic text-sage">teléfono.</span>
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed max-w-[44ch] text-pretty">
              Cada panel se acompaña de un sensor que envía la temperatura
              interior y exterior a la app AeroFreez™ Monitor. Verifica el
              ahorro y el impacto ambiental en cualquier momento.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-mint rounded-[2.5rem] p-8 md:p-10 shadow-card">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink/10">
                <div className="font-serif text-2xl">AeroFreez™ Monitor</div>
                <span className="text-xs uppercase tracking-widest text-ink/60">En vivo</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-sand rounded-2xl p-5 text-center">
                  <div className="text-xs uppercase tracking-widest text-ink/50 mb-2">Interior</div>
                  <div className="font-serif text-4xl tabular-nums">26°<span className="text-2xl">C</span></div>
                </div>
                <div className="bg-sand rounded-2xl p-5 text-center">
                  <div className="text-xs uppercase tracking-widest text-ink/50 mb-2">Exterior</div>
                  <div className="font-serif text-4xl tabular-nums">32°<span className="text-2xl">C</span></div>
                </div>
                <div className="bg-ink text-sand rounded-2xl p-5 text-center">
                  <div className="text-xs uppercase tracking-widest text-sand/60 mb-2">Δ</div>
                  <div className="font-serif text-4xl tabular-nums">-6°<span className="text-2xl">C</span></div>
                </div>
              </div>

              <div className="text-xs uppercase tracking-widest text-ink/60 mb-4">
                Impacto ambiental — este mes
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-ink/10 pb-3">
                  <span className="text-sm text-ink/70">CO₂ evitado</span>
                  <span className="font-serif text-2xl tabular-nums">105 kg</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-ink/10 pb-3">
                  <span className="text-sm text-ink/70">PET recuperado</span>
                  <span className="font-serif text-2xl tabular-nums">4 500 botellas</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-ink/70">Ahorro estimado</span>
                  <span className="font-serif text-2xl tabular-nums">$22.50 / mes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="producto" className="py-32 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-20 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 block">
            Beneficios
          </span>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
            Frescor que cuida tu bolsillo y el planeta.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              cat: "Térmico",
              title: "Hasta 6 °C menos.",
              desc: "El efecto Bernoulli enfría el aire al pasar por el cuello de cada botella, sin compresores ni refrigerantes.",
              bg: "bg-mint",
            },
            {
              num: "02",
              cat: "Económico",
              title: "Cero electricidad.",
              desc: "Funciona solo con el viento. Reduce tu factura eléctrica al evitar el uso del aire acondicionado y ventiladores.",
              bg: "bg-blush",
              offset: "md:mt-12",
            },
            {
              num: "03",
              cat: "Ecológico",
              title: "Botellas con propósito.",
              desc: "Cada panel rescata decenas de botellas PET que ya no terminarán en ríos, playas o vertederos.",
              bg: "bg-sky",
            },
          ].map((c, i) => (
            <div
              key={i}
              className={`${c.bg} ${c.offset ?? ""} rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[420px] shadow-soft hover:-translate-y-2 transition-transform duration-500`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl tabular-nums">{c.num}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">
                  {c.cat}
                </span>
              </div>
              <div>
                <h4 className="font-serif text-3xl mb-4 leading-tight text-balance">
                  {c.title}
                </h4>
                <p className="text-ink/80 text-pretty leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACTO */}
      <section id="impacto" className="bg-sage text-sand py-32 md:py-40 rounded-t-[4rem]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-sand/20 pb-20 mb-16">
            <div className="md:col-span-2">
              <span className="text-xs uppercase tracking-[0.25em] text-sand/70 mb-6 block">
                Impacto verificado
              </span>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance max-w-[18ch]">
                Cifras que hablan por sí solas.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <div className="font-serif text-6xl tabular-nums mb-3">
                105<span className="text-3xl ml-1">kg</span>
              </div>
              <div className="text-sm uppercase tracking-widest text-sand/70">
                CO₂ evitado / mes
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="font-serif text-6xl tabular-nums mb-3">4 500</div>
              <div className="text-sm uppercase tracking-widest text-sand/70">
                Botellas PET recuperadas
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <p className="max-w-[44ch] text-pretty text-sand/85 font-light text-lg leading-relaxed">
              Cada panel AeroFreez instalado evita emisiones, recupera plástico y
              ahorra dinero. Una solución hecha en casa que escala con la comunidad.
            </p>
            <Button size="lg" className="rounded-full bg-sand text-sage hover:bg-mint hover:text-ink h-16 px-10 text-base shrink-0">
              Ver reporte completo
            </Button>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <Gallery />

      {/* TESTIMONIOS */}
      <Testimonials />

      {/* CTA / CONTACTO */}
      <section id="contacto" className="py-32 md:py-40 px-6 md:px-12 bg-mint/40">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Empieza hoy
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance">
              Lleva <span className="italic text-sage">aire fresco</span> a tu hogar.
            </h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-[50ch] font-light leading-relaxed">
              Estamos listos para diseñar e instalar tu panel AeroFreez™ a la
              medida de tu ventana. Cuéntanos sobre tu espacio y te respondemos
              en menos de 48 horas.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 py-10 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink/60">
          <div className="uppercase tracking-[0.2em] font-medium text-ink">
            AeroFreez™ — Eco-Engineering Solutions
          </div>
          <div>© {new Date().getFullYear()} — Innovación que respira.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
