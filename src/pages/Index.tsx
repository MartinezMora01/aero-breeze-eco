import heroImg from "@/assets/aerofreez-real.png";
import detailImg from "@/assets/aerofreez-detail.jpg";
import bottlesImg from "@/assets/aerofreez-bottles.jpg";
import panelImg from "@/assets/aerofreez-hero.jpg";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-dvh bg-sand text-ink overflow-x-hidden">
      {/* NAV */}
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="font-sans uppercase tracking-[0.2em] text-sm font-semibold">
          AEROFREEZ
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm text-ink/70">
          <a href="#producto" className="hover:text-ink transition-colors">Producto</a>
          <a href="#proceso" className="hover:text-ink transition-colors">Proceso</a>
          <a href="#beneficios" className="hover:text-ink transition-colors">Beneficios</a>
          <a href="#contacto" className="hover:text-ink transition-colors">Contacto</a>
        </div>
        <Button size="lg" className="rounded-full bg-ink text-sand hover:bg-ink/90 px-7 h-12 text-sm">
          Solicitar muestra
        </Button>
      </nav>

      {/* HERO */}
      <header className="px-6 md:px-12 pt-20 md:pt-32 pb-32 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Vol. I — Ventilación regenerativa
            </span>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-[8rem] leading-[0.95] tracking-tight text-balance">
              Plástico rígido,
              <br />
              <span className="italic text-sage">tejido en</span>
              <br />
              aire respirable.
            </h1>
            <p className="font-light text-xl md:text-2xl text-ink/70 max-w-[48ch] leading-relaxed text-pretty">
              AEROFREEZ es un panel de ventilación arquitectónico fabricado a partir de
              botellas plásticas recicladas. Silencioso, estructural y sorprendentemente suave.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full bg-ink text-sand hover:bg-ink/90 h-16 px-10 text-base">
                Conocer el producto
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-ink/20 hover:bg-mint/30 h-16 px-10 text-base">
                Ver ficha técnica
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-blush rounded-[3rem] p-2 aspect-[4/5] relative shadow-card">
              <img
                src={heroImg}
                alt="Panel de ventilación AEROFREEZ hecho con botellas recicladas"
                className="w-full h-full object-cover rounded-[2.6rem]"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-sand/95 backdrop-blur-md p-6 rounded-3xl">
                <div className="text-xs uppercase tracking-widest text-ink/60 mb-2">
                  Acabado
                </div>
                <div className="font-serif text-xl">
                  Mate, micro-perforado, traslúcido.
                </div>
              </div>
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
                El proceso
              </span>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
                La alquimia de la <span className="italic text-sage">recuperación.</span>
              </h2>
              <p className="text-lg text-ink/75 leading-relaxed max-w-[42ch] text-pretty">
                No fundimos: extruimos y entrelazamos. Tratamos el PET descartado como
                fibra cruda, creando un panel que se siente más cercano al lino pesado
                que al plástico industrial.
              </p>

              <div className="flex flex-col gap-8 mt-6">
                {[
                  { t: "Origen recuperado", d: "Botellas PET recolectadas en iniciativas locales y costeras." },
                  { t: "Microhilado", d: "Las escamas se transforman en filamentos resistentes y porosos." },
                  { t: "Unión térmica", d: "Fusionados sin adhesivos para mantener la permeabilidad al aire." },
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
                  alt="Botellas plásticas recicladas listas para ser procesadas"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[2.2rem] mix-blend-multiply"
                />
              </div>
              <div className="bg-blush rounded-[2.5rem] aspect-square p-2 mt-16 shadow-soft">
                <img
                  src={detailImg}
                  alt="Detalle del entramado interno del panel AEROFREEZ"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[2.2rem] mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-32 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-20 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 block">
            Propiedades
          </span>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
            Diseñado para los sentidos, pensado para tu espacio interior.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              cat: "Térmico",
              title: "Flujo cruzado pasivo.",
              desc: "El entramado microscópico ralentiza la velocidad del aire mientras mantiene un intercambio total. Las corrientes se vuelven brisa suave.",
              bg: "bg-mint",
            },
            {
              num: "02",
              cat: "Acústico",
              title: "Frecuencias suaves.",
              desc: "A diferencia de las rejillas metálicas, su composición fibrosa absorbe y difunde el ruido mecánico de alta frecuencia hasta 42 dB.",
              bg: "bg-blush",
              offset: "md:mt-12",
            },
            {
              num: "03",
              cat: "Pureza",
              title: "Cero emisiones VOC.",
              desc: "Sin resinas, sin adhesivos, sin compuestos volátiles. La integridad del panel depende solo del entrelazado físico de los hilos reciclados.",
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

      {/* SOSTENIBILIDAD */}
      <section className="bg-sage text-sand py-32 md:py-40 rounded-t-[4rem]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-sand/20 pb-20 mb-16">
            <div className="md:col-span-2">
              <span className="text-xs uppercase tracking-[0.25em] text-sand/70 mb-6 block">
                Impacto
              </span>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance max-w-[18ch]">
                Una forma hermosa de <span className="italic">no dejar huella.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <div className="font-serif text-6xl tabular-nums mb-3">84</div>
              <div className="text-sm uppercase tracking-widest text-sand/70">
                Botellas por metro cuadrado
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="font-serif text-6xl tabular-nums mb-3">
                100<span className="text-3xl">%</span>
              </div>
              <div className="text-sm uppercase tracking-widest text-sand/70">
                Reciclable en circuito cerrado
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <p className="max-w-[44ch] text-pretty text-sand/85 font-light text-lg leading-relaxed">
              Cada instalación reduce activamente la presión sobre los ecosistemas,
              transformando un residuo en un activo arquitectónico.
            </p>
            <Button size="lg" className="rounded-full bg-sand text-sage hover:bg-mint hover:text-ink h-16 px-10 text-base shrink-0">
              Ver especificaciones
            </Button>
          </div>
        </div>
      </section>

      {/* CTA / CONTACTO */}
      <section id="contacto" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
            Comencemos
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance">
            Lleva <span className="italic text-sage">aire nuevo</span> a tu próximo proyecto.
          </h2>
          <p className="text-lg md:text-xl text-ink/70 max-w-[50ch] font-light leading-relaxed">
            Trabajamos con arquitectos, diseñadores y desarrolladores que buscan
            integrar materiales conscientes sin renunciar a la elegancia.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full bg-ink text-sand hover:bg-ink/90 h-16 px-10 text-base">
              Solicitar una muestra
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-ink/20 hover:bg-mint/30 h-16 px-10 text-base">
              Hablar con el equipo
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 py-10 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink/60">
          <div className="uppercase tracking-[0.2em] font-medium text-ink">
            AEROFREEZ
          </div>
          <div>© {new Date().getFullYear()} — Diseño regenerativo.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
