import 'package:flutter/material.dart';
import 'theme/aerofreez_colors.dart';
import 'pages/home_page.dart';
import 'package:google_fonts/google_fonts.dart';

class AeroFreezApp extends StatelessWidget {
  const AeroFreezApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aero-Freez QR Scanner',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: AeroFreezColors.background,
        primaryColor: AeroFreezColors.primary,
        colorScheme: ColorScheme.light(
          primary: AeroFreezColors.primary,
          secondary: AeroFreezColors.accent,
          surface: AeroFreezColors.surface,
          background: AeroFreezColors.background,
        ),
        textTheme: GoogleFonts.interTextTheme(
          Theme.of(context).textTheme,
        ).apply(
          bodyColor: AeroFreezColors.primary,
          displayColor: AeroFreezColors.primary,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: AeroFreezColors.background,
          foregroundColor: AeroFreezColors.primary,
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const HomePage(),
    );
  }
}
