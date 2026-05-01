const testimonials = [
  {
    quote:
      "Desde que instalamos AeroFreez en la sala, no encendimos el aire acondicionado en todo el verano. Bajó casi 5 grados.",
    name: "María Elena Vásquez",
    role: "Propietaria — Guayaquil",
    bg: "bg-mint",
  },
  {
    quote:
      "Como arquitecto, lo que más me sorprende es que es bonito. Mis clientes lo piden por estética antes que por sostenibilidad.",
    name: "Andrés Cabrera",
    role: "Arquitecto — Estudio AC",
    bg: "bg-blush",
  },
  {
    quote:
      "Lo instalamos en el aula y los niños lo aman. Aprenden sobre reciclaje viendo el panel todos los días.",
    name: "Prof. Lucía Mendoza",
    role: "Escuela Verde — Quito",
    bg: "bg-sky",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonios" className="bg-sand py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6 block">
            Testimonios
          </span>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-balance">
            Voces que ya <span className="italic text-sage">respiran mejor.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className={`${t.bg} rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[360px] shadow-soft`}
            >
              <p className="font-serif text-2xl md:text-3xl leading-snug text-balance">
                <span className="text-sage">“</span>
                {t.quote}
                <span className="text-sage">”</span>
              </p>
              <footer className="mt-8 pt-6 border-t border-ink/10">
                <div className="font-medium text-ink">{t.name}</div>
                <div className="text-sm text-ink/60 mt-1">{t.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
