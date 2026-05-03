import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const AeroFreezApp());
}

const String _apiUrl = String.fromEnvironment(
  'AEROFREEZ_API_URL',
  defaultValue: 'http://10.0.2.2:3000/temperatura',
);

const String _mainSite = 'https://aero-breeze-eco.lovable.app';

const List<String> _mensajes = [
  'Esta botella que ves fue rescatada del basurero. Ahora enfria tu habitacion.',
  'El plastico no tiene que ser un problema. Aero-Freez lo convierte en solucion.',
  'Sin electricidad, sin costo, sin contaminacion. Solo fisica y creatividad.',
  'Cada botella en este panel evito contaminar el suelo por mas de 400 anos.',
  'El efecto Venturi hace que el aire se acelere al pasar por el cuello de la botella.',
  'Esta botella vivia en la basura. Hoy te da aire fresco.',
  'Un panel Aero-Freez reduce entre 3 y 7 grados la temperatura interior.',
  'El aire caliente entra por la base ancha y sale frio por el cuello estrecho.',
  'Economia circular en su maxima expresion: basura convertida en tecnologia.',
  'Esmeraldas tiene un promedio de 32 grados. Aero-Freez lo baja a 25 sin luz.',
  'El efecto Joule-Thomson explica por que el aire se enfria al expandirse.',
  'No necesitas enchufar nada. El viento hace todo el trabajo.',
  'Con 60 botellas recicladas se construye un panel de 1 metro cuadrado.',
  'Cada familia que usa Aero-Freez ahorra mas de 40 dolares al mes en luz.',
  'La geometria del cuello de la botella es un acelerador de flujo natural.',
  'Este sistema funciona mejor cuando hay una brisa de al menos 8 kilometros por hora.',
  'La inercia termica del PET evita que el calor externo entre al sistema.',
  'Un panel de ventana estandar requiere aproximadamente 70 botellas de 2 litros.',
  'Aero-Freez tarda entre 45 y 60 minutos en estabilizar la temperatura de una habitacion.',
  'El poliestireno tereftalato actua como aislante ligero contra el calor radiante.',
  'Producir 100 paneles elimina 7000 botellas de los vertederos locales.',
  'Ecuador genera miles de toneladas de PET al ano. Aero-Freez las aprovecha.',
  'Este prototipo nacio en Esmeraldas, Ecuador, con cero presupuesto.',
  'La ventana mas barata del mundo es un panel de botellas recicladas.',
  'Un aire acondicionado consume 1.2 kilovatios por hora. Aero-Freez consume cero.',
  'Ocho horas diarias de aire acondicionado generan 288 kilovatios al mes. Aero-Freez ninguno.',
  'La tasa de reciclaje de PET en Ecuador sigue siendo insuficiente. Esto es parte del cambio.',
  'El confort termico no deberia ser un lujo. Aero-Freez lo democratiza.',
  'Fabricado con madera reciclada y botellas de la calle. Costo de materiales: menos de 10 dolares.',
  'La fisica hace el trabajo. Tu solo instalas el panel.',
  'Este sistema fue disenado para zonas costeras con altas temperaturas como Esmeraldas.',
  'Cada botella en este panel tiene una historia antes de llegar aqui.',
  'No hay motor, no hay compresor, no hay factura de luz. Solo flujo de aire inteligente.',
  'La reduccion termica comprobada en campo es de entre 4 y 7 grados Celsius.',
  'El chasis puede fabricarse con madera tratada o material compuesto reciclado.',
  'La filtracion opcional con carbon activado reduce particulas PM2.5 y polen.',
  'El viento predominante en la costa ecuatoriana viene del norte y del sur.',
  'Se recomienda limpieza semestral para evitar sedimentos salinos en las boquillas.',
  'El retorno de inversion para una familia es menor a 2 meses comparado con el aire acondicionado.',
  'La brisa minima requerida para activar el flujo convectivo optimo es de 2 metros por segundo.',
  'A diferencia del aire acondicionado, Aero-Freez no emite gases de efecto invernadero.',
  'El panel estandar tiene entre 55 y 60 boquillas por metro cuadrado.',
  'Esta tecnologia es replicable por cualquier persona con acceso a botellas y madera.',
  'El diseno puede ajustarse a marcos de ventana de cualquier tamano.',
  'Los efectos Venturi y Joule-Thomson son los mismos que usan los aviones para volar.',
  'La innovacion no siempre viene de laboratorios. A veces viene del patio de tu casa.',
  'Aero-Freez es una solucion de bajo costo para un problema de alto impacto.',
  'La pobreza energetica afecta a miles de familias en la costa ecuatoriana.',
  'Este sistema puede escalar desde una ventana hasta un edificio completo.',
  'El calor no se destruye, se redirige. Eso es exactamente lo que hace Aero-Freez.',
  'La temperatura exterior de Esmeraldas promedia 33 grados en verano.',
  'Instalar Aero-Freez en fachadas norte-sur maximiza el aprovechamiento del viento costero.',
  'Un proyecto universitario puede ser una solucion real para una comunidad real.',
  'La tecnologia mas sostenible es la que usa lo que ya existe.',
  'El diseno de boquillas fue optimizado mediante principios de dinamica de fluidos.',
  'Aero-Freez combina ingenieria, ecologia y economia en un solo panel.',
  'Cada grado que baja la temperatura interior mejora la calidad de vida de una familia.',
  'Este panel no necesita mantenimiento especializado ni tecnicos certificados.',
  'El futuro de la climatizacion no es mas electricidad. Es mas inteligencia.',
  'Reciclar una botella PET ahorra el 60 por ciento de la energia necesaria para fabricar una nueva.',
  'Aero-Freez convierte un residuo de bajo valor en un activo tecnologico.',
  'El precio de reciclaje del PET en Ecuador es de aproximadamente 0.46 dolares por kilogramo.',
  'Este sistema puede combinarse con ventilacion cruzada para maximizar el efecto de enfriamiento.',
  'La climatizacion pasiva existe desde hace siglos. Aero-Freez la actualiza con materiales modernos.',
  'Una habitacion de 12 metros cuadrados puede climatizarse con un solo panel estandar.',
  'El color blanco translucido del PET refleja parte de la radiacion solar directa.',
  'Aero-Freez no tiene partes moviles. No se puede romper de forma convencional.',
  'Este proyecto demuestra que la tecnologia util no siempre cuesta mucho dinero.',
  'El aire que sientes ahora paso por 60 cuellos de botella antes de llegar a ti.',
  'Reducir el consumo electrico en el hogar reduce tambien la dependencia de combustibles fosiles.',
  'La ventilacion natural es la tecnologia de climatizacion mas antigua y mas eficiente.',
  'Aero-Freez es escalable, replicable y fabricable con residuos locales en cualquier ciudad costera.',
  'Este prototipo fue construido como demostracion de que la ecologia y la tecnologia se complementan.'
];

class AeroFreezApp extends StatelessWidget {
  const AeroFreezApp({super.key});

  @override
  Widget build(BuildContext context) {
    final baseTheme = ThemeData.dark(useMaterial3: true);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Aero-Freez Monitor',
      theme: baseTheme.copyWith(
        scaffoldBackgroundColor: const Color(0xFF08111D),
        colorScheme: baseTheme.colorScheme.copyWith(
          primary: const Color(0xFF5DDCFF),
          secondary: const Color(0xFF7EF0B4),
          tertiary: const Color(0xFFFFB15C),
          surface: const Color(0xFF0D1B2B),
        ),
        textTheme: GoogleFonts.spaceGroteskTextTheme(baseTheme.textTheme).apply(
          bodyColor: const Color(0xFFF4FBFF),
          displayColor: const Color(0xFFF4FBFF),
        ),
      ),
      home: const AeroFreezHomePage(),
    );
  }
}

class TempReading {
  const TempReading({
    required this.exterior,
    required this.interior,
    required this.delta,
    required this.mensaje,
    required this.modo,
  });

  final double exterior;
  final double interior;
  final double delta;
  final String mensaje;
  final String modo;

  factory TempReading.fromJson(Map<String, dynamic> json) {
    return TempReading(
      exterior: (json['exterior'] as num).toDouble(),
      interior: (json['interior'] as num).toDouble(),
      delta: (json['delta'] as num).toDouble(),
      mensaje: json['mensaje'] as String? ?? 'Mensaje no disponible.',
      modo: json['modo'] as String? ?? 'api',
    );
  }

  factory TempReading.demo([String? reason]) {
    final random = Random();
    final exterior = 32.0;
    final interior = 27.0;
    final delta = -5.0;

    return TempReading(
      exterior: exterior,
      interior: interior,
      delta: delta,
      mensaje: _mensajes[random.nextInt(_mensajes.length)],
      modo: 'demo',
    );
  }
}

class AeroFreezHomePage extends StatefulWidget {
  const AeroFreezHomePage({super.key});

  @override
  State<AeroFreezHomePage> createState() => _AeroFreezHomePageState();
}

class _AeroFreezHomePageState extends State<AeroFreezHomePage> {
  late Future<TempReading> _future;

  @override
  void initState() {
    super.initState();
    _future = _loadReading();
  }

  Future<TempReading> _loadReading() async {
    try {
      final response = await http.get(
        Uri.parse(_apiUrl),
        headers: const {'Accept': 'application/json'},
      );

      final decoded = jsonDecode(response.body);
      if (response.statusCode < 200 || response.statusCode >= 300) {
        final detail = decoded is Map<String, dynamic>
            ? decoded['detalle']?.toString()
            : null;
        throw Exception(detail ?? 'No se pudo consultar el backend');
      }

      if (decoded is! Map<String, dynamic>) {
        throw Exception('Respuesta inesperada del backend');
      }

      return TempReading.fromJson(decoded);
    } catch (_) {
      return TempReading.demo();
    }
  }

  Future<void> _reload() async {
    setState(() {
      _future = _loadReading();
    });
    await _future;
  }

  Future<void> _openMainSite() async {
    final uri = Uri.parse(_mainSite);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw Exception('No se pudo abrir la web principal');
    }
  }

  String _format(double value) {
    return value.toStringAsFixed(1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF06101A), Color(0xFF08111D), Color(0xFF06101A)],
          ),
        ),
        child: SafeArea(
          child: RefreshIndicator(
            onRefresh: _reload,
            color: const Color(0xFF5DDCFF),
            backgroundColor: const Color(0xFF0D1B2B),
            child: FutureBuilder<TempReading>(
              future: _future,
              builder: (context, snapshot) {
                final reading = snapshot.data ?? TempReading.demo();
                final loading =
                    snapshot.connectionState == ConnectionState.waiting;
                final error = snapshot.hasError;

                return SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        _TopRow(
                          source: reading.modo == 'demo' ? 'Demo' : 'Backend',
                          chipText: loading
                              ? 'Cargando lectura...'
                              : reading.modo == 'demo'
                                  ? 'Lectura demo'
                                  : 'Conectado al backend',
                        ),
                        const SizedBox(height: 16),
                        _HeroCard(
                          onOpenSite: _openMainSite,
                          onRefresh: _reload,
                          exterior: loading ? null : reading.exterior,
                          interior: loading ? null : reading.interior,
                          delta: loading ? null : reading.delta,
                          status: loading
                              ? 'Tomando la lectura del backend...'
                              : reading.modo == 'demo'
                                  ? 'Se uso una lectura de respaldo porque el backend no respondio o no tiene API key configurada.'
                                  : 'Lectura obtenida desde OpenWeatherMap y procesada por el backend.',
                          message: loading
                              ? 'Cargando mensaje aleatorio...'
                              : reading.mensaje,
                          modeLabel: loading
                              ? 'Cargando'
                              : (reading.modo == 'demo'
                                  ? 'Modo demo'
                                  : 'En vivo'),
                          errorText: error
                              ? 'Hubo un error al consultar el backend, pero la pantalla sigue funcionando con respaldo.'
                              : null,
                          format: _format,
                        ),
                        const SizedBox(height: 16),
                        _InfoGrid(
                          exterior: loading ? '--' : _format(reading.exterior),
                          interior: loading ? '--' : _format(reading.interior),
                          delta: loading ? '--' : _format(reading.delta),
                          source: reading.modo == 'demo'
                              ? 'Demo'
                              : 'OpenWeatherMap',
                        ),
                        const SizedBox(height: 16),
                        _MessageCard(
                            message: loading
                                ? 'Cargando mensaje aleatorio...'
                                : reading.mensaje),
                        const SizedBox(height: 16),
                        _DetailsCard(
                          note: reading.modo == 'demo'
                              ? 'Configura OPENWEATHER_API_KEY en el backend para habilitar la lectura real de Esmeraldas.'
                              : 'El QR ya esta conectado al backend y puede consultarse desde el celular con CORS abierto.',
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}

class _TopRow extends StatelessWidget {
  const _TopRow({required this.source, required this.chipText});

  final String source;
  final String chipText;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.spaceBetween,
      runSpacing: 12,
      spacing: 12,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                gradient: const LinearGradient(
                  colors: [Color(0x3D5DDCFF), Color(0x337EF0B4)],
                ),
                border: Border.all(color: const Color(0x2C68D5FF)),
              ),
              alignment: Alignment.center,
              child: const Text('A',
                  style: TextStyle(
                      fontWeight: FontWeight.w700, color: Color(0xFF5DDCFF))),
            ),
            const SizedBox(width: 10),
            const Text(
              'Aero-Freez Monitor',
              style: TextStyle(fontWeight: FontWeight.w700, letterSpacing: 1.0),
            ),
          ],
        ),
        Chip(
          backgroundColor: const Color(0x660D1B2B),
          side: const BorderSide(color: Color(0x2C68D5FF)),
          label: Text('$chipText · $source'),
        ),
      ],
    );
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard({
    required this.onOpenSite,
    required this.onRefresh,
    required this.exterior,
    required this.interior,
    required this.delta,
    required this.status,
    required this.message,
    required this.modeLabel,
    required this.format,
    this.errorText,
  });

  final VoidCallback onOpenSite;
  final VoidCallback onRefresh;
  final double? exterior;
  final double? interior;
  final double? delta;
  final String status;
  final String message;
  final String modeLabel;
  final String Function(double) format;
  final String? errorText;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: const Color(0xD20D1B2B),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0x2C68D5FF)),
        boxShadow: const [
          BoxShadow(
              blurRadius: 40, color: Color(0x44000000), offset: Offset(0, 20))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Validacion termica en tiempo real',
            style: TextStyle(
              color: Color(0xFF7EF0B4),
              fontSize: 12,
              letterSpacing: 1.1,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'Enfria tu hogar, refresca al planeta.',
            style: TextStyle(
                fontSize: 30,
                height: 0.98,
                fontWeight: FontWeight.w700,
                letterSpacing: -1.4),
          ),
          const SizedBox(height: 14),
          Text(
            'La lectura exterior de Esmeraldas, el confort interior simulado y el mensaje del proyecto se muestran en una sola pantalla lista para el QR.',
            style: TextStyle(
                color: Colors.white.withValues(alpha: 0.76), height: 1.55),
          ),
          const SizedBox(height: 18),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              FilledButton(
                onPressed: onRefresh,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFF5DDCFF),
                  foregroundColor: const Color(0xFF03111A),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                ),
                child: const Text('Actualizar lectura'),
              ),
              OutlinedButton(
                onPressed: onOpenSite,
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.white,
                  side: const BorderSide(color: Color(0x2C68D5FF)),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                ),
                child: const Text('Abrir sitio principal'),
              ),
            ],
          ),
          const SizedBox(height: 20),
          LayoutBuilder(
            builder: (context, constraints) {
              final isNarrow = constraints.maxWidth < 700;
              final children = [
                _MetricTile(
                    title: 'Exterior',
                    value: exterior == null ? '--' : '${format(exterior!)} °C',
                    caption: 'OpenWeatherMap o lectura demo.'),
                _MetricTile(
                    title: 'Interior',
                    value: interior == null ? '--' : '${format(interior!)} °C',
                    caption: 'Exterior menos 3 a 7 grados.'),
                _MetricTile(
                    title: 'Delta',
                    value: delta == null ? '--' : '${format(delta!)} °C',
                    caption: 'Mayor alivio cuando es mas negativo.'),
              ];

              return isNarrow
                  ? Column(children: [
                      for (final child in children) ...[
                        child,
                        const SizedBox(height: 12)
                      ]
                    ])
                  : Row(children: [
                      for (var i = 0; i < children.length; i++) ...[
                        Expanded(child: children[i]),
                        if (i != children.length - 1) const SizedBox(width: 12),
                      ],
                    ]);
            },
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0x2210B2D6),
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: const Color(0x2C68D5FF)),
                ),
                child: Text(modeLabel,
                    style: const TextStyle(fontWeight: FontWeight.w700)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  status,
                  style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.76),
                      height: 1.45),
                ),
              ),
            ],
          ),
          if (errorText != null) ...[
            const SizedBox(height: 12),
            Text(errorText!,
                style: const TextStyle(
                    color: Color(0xFFFF7D8A), fontWeight: FontWeight.w700)),
          ],
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF091623),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0x1F68D5FF)),
            ),
            child: Text(
              message,
              style: const TextStyle(fontSize: 16, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}

class _MetricTile extends StatelessWidget {
  const _MetricTile(
      {required this.title, required this.value, required this.caption});

  final String title;
  final String value;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0B1928),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0x2368D5FF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title,
                  style: const TextStyle(
                      color: Color(0xFFB6CFDD),
                      fontSize: 12,
                      letterSpacing: 1.1,
                      fontWeight: FontWeight.w700)),
              const Text(' ', style: TextStyle(fontSize: 12)),
            ],
          ),
          const SizedBox(height: 14),
          Text(value,
              style: const TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -1.2)),
          const SizedBox(height: 10),
          Text(caption,
              style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.68), height: 1.4)),
        ],
      ),
    );
  }
}

class _InfoGrid extends StatelessWidget {
  const _InfoGrid(
      {required this.exterior,
      required this.interior,
      required this.delta,
      required this.source});

  final String exterior;
  final String interior;
  final String delta;
  final String source;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: [
        _InfoCard(
            title: 'Exterior',
            value: '$exterior °C',
            caption: 'Temperatura consultada para Esmeraldas.'),
        _InfoCard(
            title: 'Interior',
            value: '$interior °C',
            caption: 'Simulacion exterior menos entre 3 y 7 grados.'),
        _InfoCard(
            title: 'Delta',
            value: '$delta °C',
            caption: 'Diferencia entre exterior e interior.'),
        _InfoCard(
            title: 'Fuente',
            value: source,
            caption: 'El backend devuelve lectura real o demo de respaldo.'),
      ],
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard(
      {required this.title, required this.value, required this.caption});

  final String title;
  final String value;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 220,
      constraints: const BoxConstraints(minWidth: 160),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF0B1928),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0x2368D5FF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: const TextStyle(
                  color: Color(0xFFB6CFDD),
                  fontSize: 12,
                  letterSpacing: 1.1,
                  fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Text(value,
              style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -1.0)),
          const SizedBox(height: 8),
          Text(caption,
              style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.68), height: 1.45)),
        ],
      ),
    );
  }
}

class _MessageCard extends StatelessWidget {
  const _MessageCard({required this.message});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1B2B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0x2368D5FF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Mensaje del QR',
              style: TextStyle(
                  color: Color(0xFF7EF0B4),
                  fontSize: 12,
                  letterSpacing: 1.1,
                  fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Text(message, style: const TextStyle(fontSize: 17, height: 1.5)),
        ],
      ),
    );
  }
}

class _DetailsCard extends StatelessWidget {
  const _DetailsCard({required this.note});

  final String note;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF0D1B2B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0x2368D5FF)),
      ),
      child: Text(
        note,
        style: TextStyle(
            color: Colors.white.withValues(alpha: 0.74), height: 1.55),
      ),
    );
  }
}
