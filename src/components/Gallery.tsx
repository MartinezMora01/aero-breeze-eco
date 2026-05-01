import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const items = [
  { img: g1, title: "Sala residencial", place: "Guayaquil, EC", bg: "bg-mint" },
  { img: g2, title: "Vivienda costera", place: "Manabí, EC", bg: "bg-blush" },
  { img: g3, title: "Aula educativa", place: "Quito, EC", bg: "bg-sky" },
  { img: g4, title: "Cafetería", place: "Cuenca, EC", bg: "bg-mint" },
];

export const Gallery = () => {
  return (
    <section id="galeria" className="py-32 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="mb-20 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 block">
          Galería
        </span>
        <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
          Instalaciones que <span className="italic text-sage">respiran.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {items.map((it, i) => (
          <figure
            key={i}
            className={`${it.bg} rounded-[2.5rem] p-3 shadow-soft ${
              i % 2 === 1 ? "md:mt-16" : ""
            } group hover:-translate-y-2 transition-transform duration-500`}
          >
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={it.img}
                alt={`Instalación AeroFreez en ${it.title}, ${it.place}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption className="flex items-baseline justify-between px-4 pt-5 pb-2">
              <span className="font-serif text-2xl">{it.title}</span>
              <span className="text-xs uppercase tracking-widest text-ink/60">
                {it.place}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
