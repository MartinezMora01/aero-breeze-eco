import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const ciudad = process.env.CIUDAD || "Esmeraldas,EC";
const apiKey = process.env.OPENWEATHER_API_KEY || "";
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const indexFilePath = path.resolve(currentDir, "..", "index.html");

const mensajes = [
  "Esta botella que ves fue rescatada del basurero. Ahora enfria tu habitacion.",
  "El plastico no tiene que ser un problema. Aero-Freez lo convierte en solucion.",
  "Sin electricidad, sin costo, sin contaminacion. Solo fisica y creatividad.",
  "Cada botella en este panel evito contaminar el suelo por mas de 400 anos.",
  "El efecto Venturi hace que el aire se acelere al pasar por el cuello de la botella.",
  "Esta botella vivia en la basura. Hoy te da aire fresco.",
  "Un panel Aero-Freez reduce entre 3 y 7 grados la temperatura interior.",
  "El aire caliente entra por la base ancha y sale frio por el cuello estrecho.",
  "Economia circular en su maxima expresion: basura convertida en tecnologia.",
  "Esmeraldas tiene un promedio de 32 grados. Aero-Freez lo baja a 25 sin luz.",
  "El efecto Joule-Thomson explica por que el aire se enfria al expandirse.",
  "No necesitas enchufar nada. El viento hace todo el trabajo.",
  "Con 60 botellas recicladas se construye un panel de 1 metro cuadrado.",
  "Cada familia que usa Aero-Freez ahorra mas de 40 dolares al mes en luz.",
  "La geometria del cuello de la botella es un acelerador de flujo natural.",
  "Este sistema funciona mejor cuando hay una brisa de al menos 8 kilometros por hora.",
  "La inercia termica del PET evita que el calor externo entre al sistema.",
  "Un panel de ventana estandar requiere aproximadamente 70 botellas de 2 litros.",
  "Aero-Freez tarda entre 45 y 60 minutos en estabilizar la temperatura de una habitacion.",
  "El poliestireno tereftalato actua como aislante ligero contra el calor radiante.",
  "Producir 100 paneles elimina 7000 botellas de los vertederos locales.",
  "Ecuador genera miles de toneladas de PET al ano. Aero-Freez las aprovecha.",
  "Este prototipo nacio en Esmeraldas, Ecuador, con cero presupuesto.",
  "La ventana mas barata del mundo es un panel de botellas recicladas.",
  "Un aire acondicionado consume 1.2 kilovatios por hora. Aero-Freez consume cero.",
  "Ocho horas diarias de aire acondicionado generan 288 kilovatios al mes. Aero-Freez ninguno.",
  "La tasa de reciclaje de PET en Ecuador sigue siendo insuficiente. Esto es parte del cambio.",
  "El confort termico no deberia ser un lujo. Aero-Freez lo democratiza.",
  "Fabricado con madera reciclada y botellas de la calle. Costo de materiales: menos de 10 dolares.",
  "La fisica hace el trabajo. Tu solo instalas el panel.",
  "Este sistema fue disenado para zonas costeras con altas temperaturas como Esmeraldas.",
  "Cada botella en este panel tiene una historia antes de llegar aqui.",
  "No hay motor, no hay compresor, no hay factura de luz. Solo flujo de aire inteligente.",
  "La reduccion termica comprobada en campo es de entre 4 y 7 grados Celsius.",
  "El chasis puede fabricarse con madera tratada o material compuesto reciclado.",
  "La filtracion opcional con carbon activado reduce particulas PM2.5 y polen.",
  "El viento predominante en la costa ecuatoriana viene del norte y del sur.",
  "Se recomienda limpieza semestral para evitar sedimentos salinos en las boquillas.",
  "El retorno de inversion para una familia es menor a 2 meses comparado con el aire acondicionado.",
  "La brisa minima requerida para activar el flujo convectivo optimo es de 2 metros por segundo.",
  "A diferencia del aire acondicionado, Aero-Freez no emite gases de efecto invernadero.",
  "El panel estandar tiene entre 55 y 60 boquillas por metro cuadrado.",
  "Esta tecnologia es replicable por cualquier persona con acceso a botellas y madera.",
  "El diseno puede ajustarse a marcos de ventana de cualquier tamano.",
  "Los efectos Venturi y Joule-Thomson son los mismos que usan los aviones para volar.",
  "La innovacion no siempre viene de laboratorios. A veces viene del patio de tu casa.",
  "Aero-Freez es una solucion de bajo costo para un problema de alto impacto.",
  "La pobreza energetica afecta a miles de familias en la costa ecuatoriana.",
  "Este sistema puede escalar desde una ventana hasta un edificio completo.",
  "El calor no se destruye, se redirige. Eso es exactamente lo que hace Aero-Freez.",
  "La temperatura exterior de Esmeraldas promedia 33 grados en verano.",
  "Instalar Aero-Freez en fachadas norte-sur maximiza el aprovechamiento del viento costero.",
  "Un proyecto universitario puede ser una solucion real para una comunidad real.",
  "La tecnologia mas sostenible es la que usa lo que ya existe.",
  "El diseno de boquillas fue optimizado mediante principios de dinamica de fluidos.",
  "Aero-Freez combina ingenieria, ecologia y economia en un solo panel.",
  "Cada grado que baja la temperatura interior mejora la calidad de vida de una familia.",
  "Este panel no necesita mantenimiento especializado ni tecnicos certificados.",
  "El futuro de la climatizacion no es mas electricidad. Es mas inteligencia.",
  "Reciclar una botella PET ahorra el 60 por ciento de la energia necesaria para fabricar una nueva.",
  "Aero-Freez convierte un residuo de bajo valor en un activo tecnologico.",
  "El precio de reciclaje del PET en Ecuador es de aproximadamente 0.46 dolares por kilogramo.",
  "Este sistema puede combinarse con ventilacion cruzada para maximizar el efecto de enfriamiento.",
  "La climatizacion pasiva existe desde hace siglos. Aero-Freez la actualiza con materiales modernos.",
  "Una habitacion de 12 metros cuadrados puede climatizarse con un solo panel estandar.",
  "El color blanco translucido del PET refleja parte de la radiacion solar directa.",
  "Aero-Freez no tiene partes moviles. No se puede romper de forma convencional.",
  "Este proyecto demuestra que la tecnologia util no siempre cuesta mucho dinero.",
  "El aire que sientes ahora paso por 60 cuellos de botella antes de llegar a ti.",
  "Reducir el consumo electrico en el hogar reduce tambien la dependencia de combustibles fosiles.",
  "La ventilacion natural es la tecnologia de climatizacion mas antigua y mas eficiente.",
  "Aero-Freez es escalable, replicable y fabricable con residuos locales en cualquier ciudad costera.",
  "Este prototipo fue construido como demostracion de que la ecologia y la tecnologia se complementan."
];

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile(indexFilePath);
});

function redondearTemperatura(valor) {
  return Math.round(valor * 10) / 10;
}

function obtenerDescuentoInterior() {
  return Math.floor(Math.random() * 5) + 3;
}

function seleccionarMensaje() {
  return mensajes[Math.floor(Math.random() * mensajes.length)];
}

async function obtenerExteriorDesdeOpenWeather() {
  if (!apiKey) {
    return {
      exterior: 32.0,
      modo: "demo"
    };
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", ciudad);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "es");
  url.searchParams.set("appid", apiKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenWeatherMap respondio ${response.status}`);
    }

    const data = await response.json();
    const exterior = Number(data?.main?.temp);

    if (!Number.isFinite(exterior)) {
      throw new Error("No se pudo leer la temperatura exterior");
    }

    return {
      exterior: redondearTemperatura(exterior),
      modo: "api"
    };
  } catch (error) {
    console.warn("Fallo OpenWeatherMap, se usara una lectura demo:", error.message);
    return {
      exterior: 32.0,
      modo: "demo"
    };
  }
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/temperatura", async (_req, res) => {
  try {
    const { exterior, modo } = await obtenerExteriorDesdeOpenWeather();
    const descuento = obtenerDescuentoInterior();
    const interior = redondearTemperatura(exterior - descuento);
    const delta = redondearTemperatura(interior - exterior);

    res.json({
      exterior,
      interior,
      delta,
      mensaje: seleccionarMensaje(),
      modo
    });
  } catch (error) {
    res.status(500).json({
      error: "No se pudo construir la respuesta de temperatura",
      detalle: error.message
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: "Ruta no encontrada"
  });
});

app.listen(port, () => {
  console.log(`Aero-Freez backend listo en http://localhost:${port}`);
  console.log(`Ciudad configurada: ${ciudad}`);
});