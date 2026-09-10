# Cajón POSCA — PWA

Inventario, rueda cromática, escáner de códigos de barras y lista de compras para
marcadores POSCA. Aplicación web progresiva: se instala en el teléfono, funciona sin
conexión y guarda todo en el dispositivo (IndexedDB + copia en localStorage). Sin backend.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Cascarón de la app. Incluye el estado inicial (`#posca-state`) que solo se usa la primera vez. |
| `app.js` | Toda la lógica: inventario, motor de color (HSL / OKLCH, ΔE2000), decodificador EAN-13 embebido, escáner, datos. |
| `styles.css` | Estética negra tipo envase POSCA. |
| `sw.js` | Service worker: precachea el cascarón y las fuentes; `VERSION` controla las actualizaciones. |
| `manifest.webmanifest` | Nombre, iconos, `standalone`, accesos directos (`?sheet=escaner`, `?sheet=rueda`). |
| raíz (sin carpetas) | Iconos 192 / 512 / maskable / apple-touch-icon. |
| `tools/bump.py` | Sube la versión en `index.html`, `app.js` y `sw.js` a la vez. |
| `legacy/` | El artifact original de claude.ai y su estado, como referencia histórica. |
| `_test/test.js` | Suite Playwright (32 comprobaciones): persistencia, exportar/importar, offline, actualización. |

## Publicar (GitHub Pages)

1. Crea un repositorio (por ejemplo `cajon-posca`) y sube estos archivos a la rama `main`.
2. En **Settings → Pages**, elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. En un par de minutos la app queda en `https://<usuario>.github.io/cajon-posca/`.

Cualquier hosting estático con HTTPS sirve igual (Netlify, Vercel, Cloudflare Pages).
HTTPS es obligatorio: sin él no hay service worker ni cámara.

## Instalar en el iPhone

Abre la URL en **Safari** → botón **Compartir** → **Añadir a pantalla de inicio**.
Se abre a pantalla completa, sin barra del navegador, con cámara y sin conexión.
En Android, Chrome ofrece «Instalar aplicación» solo.

## Sacar una versión nueva

```bash
python3 tools/bump.py 1.0.1      # index.html, app.js y sw.js
git commit -am "v1.0.1" && git push
```

Los dispositivos con la app instalada detectan la nueva versión al abrirla (o con
«Buscar actualización» en la pastilla del encabezado) y muestran **Actualizar**.
Los datos no se tocan: viven en IndexedDB, fuera del caché.

## Respaldos

Pastilla del encabezado → **Datos y respaldo** → *Exportar respaldo (.json)*.
El mismo archivo se importa desde otro dispositivo o navegador. No hay nube: el
respaldo es la única forma de mover el cajón entre teléfonos.

## Probar en local

```bash
cd _test && npm i playwright@1.47.2 && node test.js
```
