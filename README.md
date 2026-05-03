# Aero-Freez QR System

Esta rama queda lista para GitHub Pages como sitio estático. La versión pública usa un solo archivo HTML y no depende de backend.

## Qué incluye

- Mini web en [index.html](index.html)
- App Flutter en [lib/main.dart](lib/main.dart)
- Backend opcional conservado en [backend/server.js](backend/server.js) por si luego lo quieres reutilizar

## GitHub Pages

- Sube el contenido de esta rama al repositorio de GitHub que ya usas para Martinez.
- Activa GitHub Pages desde Settings -> Pages y elige la rama que publique [index.html](index.html) desde la raíz.
- GitHub Pages sirve por HTTPS, no por HTTP plano.

## Cómo funciona la web pública

- La mini web genera una lectura demo en el navegador con `Math.random()`.
- Muestra exterior, interior, delta y un mensaje aleatorio sin usar servidor.
- El botón principal sigue llevando a la web de Lovable.

## Flutter Android

1. Instalar dependencias:

```bash
flutter pub get
```

1. Ejecutar en un emulador Android:

```bash
flutter run
```

## Archivos clave

- [index.html](index.html)
- [lib/main.dart](lib/main.dart)
- [pubspec.yaml](pubspec.yaml)

## Nota

Si más adelante quieres recuperar el backend, los archivos siguen en `backend/` sin afectar el sitio estático.
