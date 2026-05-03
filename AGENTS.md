# AGENTS.md — Aero-Freez QR System

## Contexto del proyecto
Prototipo universitario de emprendimiento. Sistema de escaneo QR que abre una mini web
mostrando temperatura real de Esmeraldas (OpenWeatherMap) + temperatura interior simulada
+ mensaje aleatorio predefinido. Existe una web principal en React en aero-breeze-eco.lovable.app
cuya paleta de colores debe replicarse exactamente.

## Que hay que construir

### 1. Mini web (HTML/CSS/JS — un solo archivo)
- Se abre cuando se escanea el QR
- Muestra temperatura exterior real (OpenWeatherMap, ciudad: Esmeraldas,EC)
- Muestra temperatura interior simulada = exterior - random(3,7)
- Muestra delta = diferencia entre ambas
- Muestra 1 mensaje aleatorio del array de mensajes predefinidos (ver MESSAGES.md)
- Boton link a la web principal: aero-breeze-eco.lovable.app
- Colores: usar exactamente la paleta de DESIGN.md
- Sin frameworks, sin dependencias, HTML puro, un solo archivo index.html
- Debe verse bien en celular (mobile first)
- Debe cargar rapido (sin librerias pesadas)

### 2. App Flutter
- Misma pantalla que la mini web pero en Flutter
- Mismos colores de DESIGN.md
- Llama a OpenWeatherMap igual que la web
- Calcula interior simulada igual
- Muestra mensaje aleatorio del mismo array
- Boton para abrir aero-breeze-eco.lovable.app
- Solo Android (APK para distribuir)
- Una sola pantalla, simple

### 3. Backend AWS (Node.js / Express simple)
- Un endpoint: GET /temperatura
- Llama a OpenWeatherMap internamente (API key en variable de entorno)
- Devuelve: { exterior, interior, delta, mensaje }
- Interior y mensaje se calculan en el backend
- CORS abierto (cualquier origen puede llamar)
- Deploy en AWS EC2 o Lambda segun disponibilidad

## Stack
- Mini web: HTML/CSS/JS puro
- App: Flutter (Android)
- Backend: Node.js + Express
- API temperatura: OpenWeatherMap free tier
- Hosting web: AWS (S3 static o EC2)
- Hosting backend: AWS

## Variables de entorno (backend)
```
OPENWEATHER_API_KEY=tu_key_aqui
CIUDAD=Esmeraldas,EC
PORT=3000
```

## Reglas de codigo
- Sin emojis en el codigo
- Sin caracteres especiales raros
- Respetar tildes en textos en espanol
- Comentarios en espanol
- Codigo limpio y simple, esto es un prototipo

## Archivos que debe crear el agente
1. index.html — mini web completa
2. lib/main.dart — app Flutter
3. pubspec.yaml — dependencias Flutter
4. backend/server.js — API Node.js
5. backend/package.json
6. backend/.env.example
7. README.md — instrucciones de deploy en AWS

## Lo que NO debe hacer el agente
- No crear sistema de autenticacion
- No crear base de datos
- No usar Firebase
- No usar Flutter Web (solo Android APK)
- No instalar librerias pesadas en la mini web
- No usar AI/LLM de ningun tipo
- No crear mas pantallas de las necesarias
