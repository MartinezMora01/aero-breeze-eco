#!/usr/bin/env python3
"""
Generar QR codes bonitos para AeroFreez
Colores: Verde oscuro (#2a322e) y Crema (#faf8f5)
"""

import qrcode
from qrcode.image.svg import SvgPathImage, SvgPathFillImage
from PIL import Image, ImageDraw
import os

# Configuración
qr_url = "https://martinezmora01.github.io/aero-breeze-qr/"
color_dark = "#2a322e"  # Verde oscuro
color_light = "#faf8f5"  # Crema
size = 10
border = 2

# Crear carpeta de salida
output_dir = "c:\\Users\\WinterOS\\martinez\\qr-codes"
os.makedirs(output_dir, exist_ok=True)

print(f"📱 Generando QR Code para: {qr_url}")
print(f"🎨 Colores: {color_dark} / {color_light}")
print(f"📁 Salida: {output_dir}")

# 1. QR PNG (versión estándar)
print("\n1️⃣  Generando QR PNG...")
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=size,
    border=border,
)
qr.add_data(qr_url)
qr.make(fit=True)

img_png = qr.make_image(fill_color=color_dark, back_color=color_light)
qr_png_path = os.path.join(output_dir, "aero-breeze-qr.png")
img_png.save(qr_png_path)
print(f"   ✓ {qr_png_path}")

# 2. QR PNG Grande (300x300)
print("\n2️⃣  Generando QR PNG Grande (300x300)...")
img_large = img_png.resize((300, 300), Image.LANCZOS)
qr_large_path = os.path.join(output_dir, "aero-breeze-qr-large.png")
img_large.save(qr_large_path)
print(f"   ✓ {qr_large_path}")

# 3. QR SVG (Path-based)
print("\n3️⃣  Generando QR SVG (Path)...")
qr_svg = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=size,
    border=border,
    image_factory=SvgPathImage,
)
qr_svg.add_data(qr_url)
qr_svg.make(fit=True)

img_svg = qr_svg.make_image(fill_color=color_dark, back_color=color_light)
qr_svg_path = os.path.join(output_dir, "aero-breeze-qr.svg")
img_svg.save(qr_svg_path)
print(f"   ✓ {qr_svg_path}")

# 4. QR SVG con borde redondeado (decorativo)
print("\n4️⃣  Generando QR SVG Decorativo...")
qr_svg2 = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=size,
    border=border,
    image_factory=SvgPathFillImage,
)
qr_svg2.add_data(qr_url)
qr_svg2.make(fit=True)

img_svg2 = qr_svg2.make_image(fill_color=color_dark, back_color=color_light)
qr_deco_path = os.path.join(output_dir, "aero-breeze-qr-decorated.svg")
img_svg2.save(qr_deco_path)
print(f"   ✓ {qr_deco_path}")

# 5. Crear HTML de vista previa
print("\n5️⃣  Generando HTML de vista previa...")
html_preview = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AeroFreez QR Codes - Vista Previa</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #faf8f5;
            padding: 2rem;
            color: #2a322e;
        }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        h1 {{ text-align: center; margin-bottom: 3rem; font-size: 2rem; }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }}
        .card {{
            background: white;
            padding: 2rem;
            border-radius: 8px;
            border: 2px solid #849980;
            text-align: center;
            transition: all 0.3s;
        }}
        .card:hover {{
            transform: translateY(-8px);
            box-shadow: 0 16px 32px rgba(42, 50, 46, 0.15);
        }}
        .card h3 {{ margin-bottom: 1rem; color: #2a322e; }}
        .card img, .card svg {{
            max-width: 220px;
            width: 100%;
            height: auto;
            margin: 1rem 0;
            border: 1px solid #e0ddd9;
            border-radius: 4px;
        }}
        .card p {{ font-size: 0.9rem; color: #849980; margin: 1rem 0; }}
        .btn {{
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #2a322e;
            color: #faf8f5;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 1rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-weight: 600;
        }}
        .btn:hover {{ background: #1a1f1c; transform: translateY(-2px); }}
        .info {{
            background: #849980;
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        }}
        .url {{
            font-family: monospace;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            word-break: break-all;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 AeroFreez QR Codes</h1>
        
        <div class="info">
            <p><strong>URL Apuntada:</strong></p>
            <div class="url">{qr_url}</div>
            <p><strong>Colores:</strong> Verde Oscuro (#2a322e) y Crema (#faf8f5)</p>
        </div>

        <div class="grid">
            <div class="card">
                <h3>📱 QR PNG Estándar</h3>
                <img src="aero-breeze-qr.png" alt="QR Code Standard">
                <p>Para usar en redes sociales y documentos digitales</p>
                <a href="aero-breeze-qr.png" download class="btn">Descargar PNG</a>
            </div>

            <div class="card">
                <h3>📄 QR PNG Grande</h3>
                <img src="aero-breeze-qr-large.png" alt="QR Code Large">
                <p>300x300px - Para impresión en alta resolución</p>
                <a href="aero-breeze-qr-large.png" download class="btn">Descargar PNG</a>
            </div>

            <div class="card">
                <h3>🎯 QR SVG Vectorial</h3>
                <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #e0ddd9; border-radius: 4px;">
                    <rect width="220" height="220" fill="#faf8f5"/>
                    <text x="110" y="110" font-size="14" text-anchor="middle" fill="#2a322e">QR SVG</text>
                </svg>
                <p>Formato vectorial - Escalable a cualquier tamaño sin pérdida</p>
                <a href="aero-breeze-qr.svg" download class="btn">Descargar SVG</a>
            </div>

            <div class="card">
                <h3>✨ QR Decorado</h3>
                <img src="aero-breeze-qr.png" alt="QR Code Decorated" style="border-radius: 12px;">
                <p>Versión mejorada con efectos visuales</p>
                <a href="aero-breeze-qr-decorated.svg" download class="btn">Descargar SVG</a>
            </div>
        </div>

        <div style="margin-top: 4rem; padding: 2rem; background: white; border-radius: 8px; border: 2px solid #849980;">
            <h3>📋 Instrucciones de Uso</h3>
            <ul style="margin-left: 1.5rem; line-height: 2;">
                <li><strong>Redes Sociales:</strong> Usa los PNG (estándar o grande)</li>
                <li><strong>Carteles/Impresión:</strong> Usa el PNG grande o SVG</li>
                <li><strong>Documentos Digitales:</strong> Usa SVG para mejor calidad</li>
                <li><strong>Tamaño Mínimo:</strong> 100x100px para que sea legible en móviles</li>
                <li><strong>Espacio en Blanco:</strong> Mantén al menos 20px de margen alrededor del QR</li>
            </ul>
        </div>
    </div>
</body>
</html>
"""

html_path = os.path.join(output_dir, "preview.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_preview)
print(f"   ✓ {html_path}")

print("\n" + "="*60)
print("✅ ¡QR Codes generados exitosamente!")
print("="*60)
print(f"\nArchivos creados en: {output_dir}")
print(f"  • aero-breeze-qr.png (estándar)")
print(f"  • aero-breeze-qr-large.png (300x300)")
print(f"  • aero-breeze-qr.svg (vectorial)")
print(f"  • aero-breeze-qr-decorated.svg (decorado)")
print(f"  • preview.html (vista previa)")
