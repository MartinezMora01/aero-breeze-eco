# DESIGN.md — Paleta de colores Aero-Freez

## IMPORTANTE PARA EL AGENTE
Los colores de abajo son PLACEHOLDER. Antes de construir cualquier interfaz,
el dueno del proyecto debe confirmar la paleta exacta de aero-breeze-eco.lovable.app

## Paleta placeholder (reemplazar con colores reales)

```css
:root {
  --color-fondo:       #0a1628;   /* azul oscuro — CONFIRMAR */
  --color-primario:    #00bcd4;   /* cyan/verde agua — CONFIRMAR */
  --color-secundario:  #4caf50;   /* verde — CONFIRMAR */
  --color-acento:      #ff5722;   /* naranja — CONFIRMAR */
  --color-texto:       #ffffff;   /* blanco — CONFIRMAR */
  --color-texto-suave: rgba(255,255,255,0.6);
  --color-tarjeta:     #1a2e4a;   /* azul medio — CONFIRMAR */
  --color-borde:       rgba(0,188,212,0.3);
}
```

## Tipografia placeholder
- Fuente principal: la que use la web de Lovable (CONFIRMAR)
- Fallback: system-ui, sans-serif

## Como confirmar los colores
1. Abrir aero-breeze-eco.lovable.app en Chrome
2. Click derecho > Inspeccionar
3. En la pestana Elements buscar `:root` o `body`
4. Copiar los valores de las variables CSS
5. Actualizar este archivo antes de que el agente construya la interfaz

## Notas de diseno
- Mobile first — la mini web se ve en celular
- Mismo estilo visual que la web principal de Lovable
- Minimalista, dark theme probable por el tema ecologico/tecnologico
