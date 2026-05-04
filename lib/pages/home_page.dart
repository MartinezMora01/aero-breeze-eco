import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/aerofreez_colors.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final MobileScannerController cameraController = MobileScannerController(
    detectionSpeed: DetectionSpeed.normal,
    facing: CameraFacing.back,
    torchEnabled: false,
  );

  bool _isDisposed = false;

  void _onDetect(BarcodeCapture capture) async {
    if (_isDisposed) return;

    final List<Barcode> barcodes = capture.barcodes;
    if (barcodes.isNotEmpty) {
      final String? code = barcodes.first.rawValue;
      // SOLO aceptar si el QR tiene la URL oficial de tu proyecto
      if (code != null && code.startsWith('https://martinezmora01.github.io/aero-breeze-qr')) {
        cameraController.stop();
        if (await canLaunchUrl(Uri.parse(code))) {
          await launchUrl(Uri.parse(code), mode: LaunchMode.externalApplication);
        } else {
          if (!mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('No se pudo abrir el enlace.')),
          );
        }
        
        Future.delayed(const Duration(seconds: 3), () {
          if (!_isDisposed && mounted) {
            cameraController.start();
          }
        });
      } else if (code != null) {
        // Si escanean otra cosa (menu de restaurante, etc)
        cameraController.stop();
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('QR no válido. Escanea un panel Aero-Freez.')),
        );
        Future.delayed(const Duration(seconds: 2), () {
          if (!_isDisposed && mounted) {
            cameraController.start();
          }
        });
      }
    }
  }

  @override
  void dispose() {
    _isDisposed = true;
    cameraController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AeroFreezColors.primary,
      body: Stack(
        children: [
          MobileScanner(
            controller: cameraController,
            onDetect: _onDetect,
          ),
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.only(top: 60, bottom: 20, left: 24, right: 24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AeroFreezColors.primary.withValues(alpha: 0.9),
                    AeroFreezColors.primary.withValues(alpha: 0.0),
                  ],
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: const BoxDecoration(
                      color: AeroFreezColors.background,
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'A',
                      style: GoogleFonts.inter(
                        color: AeroFreezColors.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'AERO-FREEZ ESCÁNER',
                    style: GoogleFonts.inter(
                      color: AeroFreezColors.background,
                      fontWeight: FontWeight.w800,
                      fontSize: 14,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                border: Border.all(color: AeroFreezColors.accent, width: 3),
                borderRadius: BorderRadius.circular(24),
              ),
            ),
          ),
          Positioned(
            bottom: 40,
            left: 20,
            right: 20,
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
              decoration: BoxDecoration(
                color: AeroFreezColors.surface,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.1),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Apunta al código QR',
                    style: GoogleFonts.inter(
                      color: AeroFreezColors.primary,
                      fontWeight: FontWeight.w800,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Serás redirigido automáticamente a la mini web para ver las lecturas.',
                    style: GoogleFonts.inter(
                      color: AeroFreezColors.primary.withValues(alpha: 0.72),
                      fontWeight: FontWeight.w500,
                      fontSize: 13,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
