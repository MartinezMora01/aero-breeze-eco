# CHANGELOG.md — Aero-Freez QR System

## Decisiones tomadas

### 2026-05 — Arquitectura inicial
- Se descarto usar AI/LLM para los mensajes por costo innecesario en prototipo universitario
- Se decidio usar mensajes predefinidos (75) seleccionados aleatoriamente
- Se decidio usar OpenWeatherMap free tier para temperatura real de Esmeraldas
- La temperatura interior se simula como exterior - random(3,7) para demostrar el efecto del panel
- Se decidio usar HTML puro para la mini web (sin frameworks) para maximo rendimiento en celular
- Se decidio que el QR apunte directamente a la mini web, no a la app
- La app Flutter es opcional y descargable desde la web principal

### Arquitectura final
```
QR fisico en botella
    |
    v
Mini web (index.html en AWS)
    |--- Llama a backend GET /temperatura
    |         |--- OpenWeatherMap API
    |         |--- Calcula interior simulada
    |         |--- Elige mensaje aleatorio
    |         |--- Devuelve JSON
    |
    v
Muestra: exterior | interior | delta | mensaje
    |
    v
Boton link a aero-breeze-eco.lovable.app
```

### Errores conocidos y lecciones
- La pagina de Lovable es React SPA, no es posible extraer colores automaticamente
- Se requiere que el dueno del proyecto confirme la paleta de colores manualmente

## Pendiente
- [ ] Paleta de colores exacta de aero-breeze-eco.lovable.app (falta confirmacion)
- [ ] API key de OpenWeatherMap (falta registro)
- [ ] URL final de AWS donde estara el index.html (para hacer los QR)
- [ ] Hacer los QR una vez que se confirme la URL
