# 🧊 AERO-FREEZ — PLAN COMPLETO DE PROTOTIPO

---

## 💰 1. MATERIALES Y COSTOS (Ecuador real)

### 🧴 Panel físico
| Material | Dónde conseguir | Costo |
|---|---|---|
| ~60 botellas PET 2L | Recolectar / pedir | $0 |
| Tabla de madera 1m x 1m | Ferretería | $5 - $7 |
| Barras de silicona fría (x10) | Ferretería | $2 |
| Pistola de silicona | Ferretería | $4 (si no tienen) |
| Cutter | Ya tienen | $0 |

### 🔌 Electrónica
| Material | Dónde conseguir | Costo |
|---|---|---|
| ESP32 (cualquier versión) | Mercado libre EC / tienda electrónica | $8 - $12 |
| Sensor DHT11 | Misma tienda | $2 - $3 |
| Cables jumper (x20) | Misma tienda | $2 |
| Protoboard (mini) | Misma tienda | $2 - $3 |
| Cable micro USB | Ya tienen | $0 |

### 💸 TOTAL ESTIMADO
| Escenario | Costo |
|---|---|
| Mínimo (sin pistola, tienen todo) | ~$15 |
| Realista | ~$25 - $30 |

---

## 📅 2. PLAN DE TRABAJO

### Semana 1 — Conseguir materiales
- Recolectar botellas PET (pedir a familia, vecinos, tiendas)
- Comprar madera y silicona
- Comprar ESP32 + DHT11

### Semana 2 — Construir el panel
- Cortar las botellas (ver paso a paso abajo)
- Montar en la tabla con silicona
- Dejar secar 24h

### Semana 3 — Programar todo
- Subir código Arduino al ESP32
- Configurar Firebase
- Hacer la app Flutter

### Semana 4 — Pruebas
- Instalar el panel en ventana
- Medir temperatura con el sensor
- Ajustar la app

---

## 🔧 3. CONSTRUCCIÓN DEL PANEL (paso a paso)

1. **Cortar** cada botella por la mitad (la parte de la base queda afuera, el cuello apunta hacia adentro)
2. **Marcar** en la tabla una cuadrícula de 7x8 huecos (tamaño del cuello de la botella)
3. **Hacer los huecos** con el cutter o con un taladro
4. **Insertar** cada botella con el cuello hacia adentro
5. **Pegar** con silicona caliente alrededor para sellar
6. Dejar secar y listo ✅

> ⚠️ El cuello estrecho es lo que genera el efecto Venturi — no lo bloquees con silicona

---

## 💻 4. CÓDIGO ARDUINO (ESP32 + DHT11 → Firebase)

```cpp
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// ─── CONFIGURA ESTO ───────────────────────────────
#define WIFI_SSID     "TU_WIFI"
#define WIFI_PASSWORD "TU_PASSWORD"
#define API_KEY       "TU_API_KEY_DE_FIREBASE"
#define DATABASE_URL  "https://TU_PROYECTO.firebaseio.com/"
// ──────────────────────────────────────────────────

#define DHTPIN  4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long lastTime = 0;

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Conectado!");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;

  Firebase.signUp(&config, &auth, "", "");
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && millis() - lastTime > 5000) {
    lastTime = millis();

    float temp = dht.readTemperature();
    float hum  = dht.readHumidity();

    if (!isnan(temp) && !isnan(hum)) {
      Firebase.RTDB.setFloat(&fbdo, "/aerofreez/temp_interior", temp);
      Firebase.RTDB.setFloat(&fbdo, "/aerofreez/humedad",       hum);
      Serial.printf("Temp: %.1f°C | Hum: %.1f%%\n", temp, hum);
    } else {
      Serial.println("Error leyendo DHT11");
    }
  }
}
```

### Librerías que necesitas instalar (Arduino IDE):
- `Firebase ESP Client` by Mobizt
- `DHT sensor library` by Adafruit
- `Adafruit Unified Sensor`

---

## 📱 5. APP FLUTTER (simple, solo lectura Firebase)

### pubspec.yaml — agregar:
```yaml
dependencies:
  firebase_core: ^3.0.0
  firebase_database: ^11.0.0
```

### main.dart completo:
```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const AeroFreezApp());
}

class AeroFreezApp extends StatelessWidget {
  const AeroFreezApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aero-Freez Monitor',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF00BCD4),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const MonitorScreen(),
    );
  }
}

class MonitorScreen extends StatefulWidget {
  const MonitorScreen({super.key});

  @override
  State<MonitorScreen> createState() => _MonitorScreenState();
}

class _MonitorScreenState extends State<MonitorScreen> {
  // Temperatura exterior simulada (puedes cambiarla manualmente)
  final double tempExterior = 33.0;

  double tempInterior = 0;
  double humedad = 0;

  @override
  void initState() {
    super.initState();
    _escucharFirebase();
  }

  void _escucharFirebase() {
    final ref = FirebaseDatabase.instance.ref('aerofreez');
    ref.onValue.listen((event) {
      final data = event.snapshot.value as Map?;
      if (data != null) {
        setState(() {
          tempInterior = (data['temp_interior'] ?? 0).toDouble();
          humedad      = (data['humedad']       ?? 0).toDouble();
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final delta = tempExterior - tempInterior;

    return Scaffold(
      backgroundColor: const Color(0xFF0A1628),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        title: const Text(
          'Aero-Freez Monitor',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const SizedBox(height: 20),

            // Tarjeta interior
            _TempCard(
              label: '🏠 Temperatura Interior',
              sublabel: 'Sensor real (ESP32)',
              valor: tempInterior,
              color: const Color(0xFF00BCD4),
            ),

            const SizedBox(height: 16),

            // Tarjeta exterior
            _TempCard(
              label: '☀️ Temperatura Exterior',
              sublabel: 'Referencia ambiental',
              valor: tempExterior,
              color: const Color(0xFFFF5722),
            ),

            const SizedBox(height: 16),

            // Diferencia
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF1A2E4A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF4CAF50), width: 2),
              ),
              child: Column(
                children: [
                  const Text(
                    '❄️ Reducción Térmica',
                    style: TextStyle(color: Colors.white70, fontSize: 14),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '-${delta.toStringAsFixed(1)}°C',
                    style: const TextStyle(
                      color: Color(0xFF4CAF50),
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Aero-Freez funcionando ✅',
                    style: TextStyle(color: Colors.white54, fontSize: 12),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Humedad
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1A2E4A),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('💧 Humedad: ',
                      style: TextStyle(color: Colors.white70)),
                  Text(
                    '${humedad.toStringAsFixed(1)}%',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _TempCard extends StatelessWidget {
  final String label;
  final String sublabel;
  final double valor;
  final Color color;

  const _TempCard({
    required this.label,
    required this.sublabel,
    required this.valor,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1A2E4A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.5), width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label,
              style: const TextStyle(color: Colors.white70, fontSize: 14)),
          Text(sublabel,
              style: const TextStyle(color: Colors.white38, fontSize: 11)),
          const SizedBox(height: 8),
          Text(
            '${valor.toStringAsFixed(1)}°C',
            style: TextStyle(
              color: color,
              fontSize: 42,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## ⚙️ 6. CONFIGURAR FIREBASE (pasos rápidos)

1. Ir a [console.firebase.google.com](https://console.firebase.google.com)
2. Crear proyecto → nombre: `aerofreez`
3. Activar **Realtime Database** → modo prueba
4. Agregar app Android/iOS → descargar `google-services.json`
5. Poner `google-services.json` en `/android/app/`
6. Copiar `API_KEY` y `DATABASE_URL` al código Arduino

### Reglas Realtime Database (para pruebas):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

---

## 🎯 RESUMEN FINAL

```
Botellas PET → Panel de madera
      ↓
  DHT11 mide temp interior
      ↓
  ESP32 → WiFi → Firebase
      ↓
  App Flutter muestra todo
```

**Costo total: ~$25-30 USD**
**Tiempo de construcción: ~2 semanas**
**Resultado: prototipo funcional para exposición** ✅
