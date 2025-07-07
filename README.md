# Asistencia QR Web

Aplicación web para registrar asistencia con códigos QR y Google Sheets.

## Funciones

- Escaneo de QR con cámara del navegador.
- Registro automático de entrada/salida en hoja de Google.
- Registro manual con búsqueda por apellido.
- Visualización de participantes y resumen.
- Compatible con GitHub Pages.

## Instrucciones

1. Crea una hoja de cálculo en Google Sheets con columnas: ID, Apellidos, Nombres, Correo, Área, Facultad.
2. Abre Google Apps Script, copia `apps_script.gs`, publícalo como Web App (cualquiera puede acceder).
3. Copia la URL del Web App y pégala dentro de `app.js` donde dice `const SCRIPT_URL = "..."`.
4. Sube el contenido a GitHub y publica como GitHub Pages.

---
