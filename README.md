# DOLCI - PEDIDOS

Sitio web estático para GitHub Pages.

## Archivos

- `index.html` — estructura de la tienda.
- `style.css` — diseño visual.
- `app.js` — productos, carrito, pedido, factura y WhatsApp.
- `images/` — imágenes del sitio.

## Publicar en GitHub Pages

Sube todos los archivos manteniendo esta estructura:

```text
/
├── index.html
├── style.css
├── app.js
└── images/
    ├── hero-left.jpg
    ├── hero-right.jpg
    ├── logo-dolci.jpg
    ├── conos.jpg
    ├── galletas.jpg
    ├── canastas.jpg
    ├── obleas.jpg
    ├── barquillos.jpg
    ├── cono-1.jpg
    ├── cono-2.jpg
    ├── cono-3.jpg
    ├── cono-4.jpg
    ├── cono-especial.jpg
    ├── mini-cono.jpg
    ├── cono-colores.jpg
    └── cono-sin-punta.jpg
```

## IMPORTANTE: precios

Los precios de conos están configurados según la referencia entregada.

Los precios de las demás categorías son valores iniciales de ejemplo. Deben reemplazarse por los precios reales antes de publicar para clientes.

Busca la sección `const categories = { ... }` dentro de `app.js`.

## WhatsApp

El número de WhatsApp de la fábrica está configurado como:

`315 545 8751`

El botón envía el resumen del pedido mediante WhatsApp.

## Factura

Después de registrar un pedido se muestra una factura con:

- número de pedido
- fecha
- cliente
- método de pago
- productos
- cantidades
- precios
- total

Desde la pantalla de factura se puede:

- compartir la factura
- enviar el pedido por WhatsApp
- imprimir o guardar como PDF

### Limitación de GitHub Pages

GitHub Pages es alojamiento estático. No puede, por sí solo, guardar pedidos en una base de datos ni enviar automáticamente un PDF adjunto desde WhatsApp.

Esta primera versión registra el pedido en el navegador del cliente y abre WhatsApp con el pedido preparado. Para automatizar completamente el envío de una factura y guardar todos los pedidos en una base de datos será necesario conectar después un backend o una API de WhatsApp Business.
