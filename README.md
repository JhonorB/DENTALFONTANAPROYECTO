# Clínica Dental La Fontana — Sitio Web Oficial

Sitio web moderno, elegante y profesional para el centro odontológico **Clínica Dental La Fontana**, ubicado en la **Av. Javier Prado Este N° 5250, Tercer Piso Oficina 301, Camacho, La Molina (Centro Comercial La Fontana)**.

Desarrollado exclusivamente con **HTML5 semántico, CSS3 puro y JavaScript Vanilla (ES6+)**, sin frameworks ni dependencias externas.

---

## 📁 Estructura del Proyecto

```text
DENTALPROYECTO/
│
├── index.html              # Estructura semántica, accesibilidad WAI-ARIA y contenido dental
├── styles.css              # Sistema de diseño, paleta médica/arquitectónica, animaciones y RWD
├── script.js               # Validación estricta de citas, menú móvil, scrollspy y modales
├── README.md               # Instrucciones completas de uso y personalización
└── assets/                 # Recursos multimedia locales
    ├── edificio-principal.jpg  # Fotografía completa del C.C. La Fontana (Sede de la clínica)
    ├── dental-hero.jpg         # Imagen clínica de rehabilitación y tecnología dental
    ├── dental-estetica.jpg     # Imagen de estética dental y diseño de sonrisa
    ├── dental-ortodoncia.jpg   # Imagen de ortodoncia y alineadores invisibles
    ├── dental-implantes.jpg    # Imagen de implantología y cirugía oral
    ├── dental-endodoncia.jpg   # Imagen de endodoncia y tratamiento de conductos
    └── dental-limpieza.jpg     # Imagen de profilaxis ultrasónica y prevención
```

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Apertura Directa:**
   - Haz doble clic sobre el archivo `index.html` para abrirlo directamente en tu navegador (Chrome, Firefox, Edge, Safari).
   - No requiere instalaciones adicionales, Node.js ni compilación.

2. **Servidor Local Activo:**
   - El proyecto se encuentra actualmente ejecutándose en tu equipo en:
     👉 **http://localhost:8080**
   - Para iniciar el servidor manualmente en cualquier momento desde PowerShell:
     ```powershell
     python -m http.server 8080
     ```

---

## 📍 Ubicación y Datos de Contacto

- **Dirección:** Av. Javier Prado Este N° 5250, Tercer Piso, Oficina 301, Urbanización Camacho, La Molina, Lima - Perú.
- **Referencia:** Centro Comercial La Fontana (frente al Trébol de Javier Prado / Camacho).
- **Horarios de Citas:**
  - Lunes a Viernes: 09:00 a 20:00 hrs
  - Sábados: 09:00 a 18:00 hrs
- **Teléfonos:** +51 (01) 456-7890 / +51 987 654 321
- **Correo Electrónico:** citas@dentallafontana.com

---

## 🖼️ Conservación de Proporciones en la Fotografía Principal

El diseño respeta estrictamente las proporciones del edificio del Centro Comercial La Fontana para evitar recortes de cornisas, techos o accesos:
- Se utiliza `object-fit: contain` con relación de aspecto `16:10` en `.hero-showcase__img`.
- Incluye un botón interactivo **"Ver foto completa"** que abre un modal accesible en pantalla completa.
- Si deseas cambiar la fotografía del edificio, solo reemplaza el archivo `assets/edificio-principal.jpg` con tu fotografía original.

---

## 🦷 Especialidades Odontológicas Disponibles

1. **Diseño de Sonrisa y Blanqueamiento:** Carillas de porcelana y resina, blanqueamiento LED.
2. **Ortodoncia Invisible y Brackets:** Alineadores transparentes y brackets de zafiro/autoligados.
3. **Implantología y Cirugía Oral:** Implantes de titanio oseointegrado y cirugía guiada 3D.
4. **Rehabilitación Oral:** Coronas de zirconio sin metal, prótesis fija y puentes cerámicos.
5. **Endodoncia sin Dolor:** Tratamiento rotatorio mecanizado para alivio inmediato y conservación dental.
6. **Profilaxis y Periodoncia:** Limpieza ultrasónica, eliminación de sarro y cuidado de encías.

---

## ✉️ Formulario de Cita y Política Sin Falsas Confirmaciones

El formulario valida en tiempo real:
- Nombre y apellidos del paciente.
- Correo electrónico válido.
- Teléfono o WhatsApp de contacto directo.
- Tratamiento odontológico de interés.
- Horario o día preferido de atención.

**Al validarse:** No emite una confirmación falsa de envío de servidor. En su lugar, presenta un aviso transparente que permite al paciente enviar su solicitud estructurada directamente por **WhatsApp** o por **Correo electrónico (mailto)** a la recepción de la Oficina 301.
