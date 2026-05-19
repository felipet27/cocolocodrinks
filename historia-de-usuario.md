# Historia de Usuario: Plataforma Web de Ventas – Cocoloco Drinks

## Visión General
Cocoloco Drinks busca revolucionar la experiencia de compra digital de bebidas y productos premium, fusionando tecnología de punta con una identidad visual magnética y una experiencia de usuario (UX) memorable. El objetivo es que cada interacción despierte el deseo de compra y transmita frescura, fiesta y alta coctelería, diferenciándose radicalmente de los e-commerce tradicionales.

---

## Infraestructura Modular Recomendada

| Capa                        | Tecnología Recomendada                        | ¿Por qué esta y no otra?                                                                                                                                         |
|-----------------------------|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Framework Base              | Next.js 15+ (con React 19) o Astro            | Renderizado híbrido, componentes del lado del servidor (RSC) para carga instantánea y ultra fluidez en el cliente.                                               |
| Experiencia Visual (3D)     | React Three Fiber (R3F) + WebGPU Renderer    | Interactividad premium, productos rotables/interactivos en 3D, exprime la GPU móvil sin sacrificar batería.                                                      |
| Animaciones de Interfaz     | GSAP + Framer Motion                         | Microinteracciones premium, transiciones suaves, efectos de scroll y revelación orgánica.                                                                        |
| Estilos                     | Tailwind CSS v4                              | Compilación ultrarrápida, CSS mínimo, rendimiento móvil óptimo.                                                                                                  |
| Gestión de Estado           | Zustand                                      | Estado reactivo, simple y eficiente para variantes, dirección y pago, sin la complejidad de Redux ni el overhead de Context.                                     |

---

## Identidad Visual y Estética Web
- Paleta: Fondo oscuro (#0D0D0D o verde selva casi negro), contrastes neón, colores vibrantes.
- Efecto Líquido: Animaciones fluidas tipo agua/alcohol usando shaders WebGL o filtros SVG con GSAP.
- Fotografía/Render: Productos principales reaccionan al giroscopio del móvil, generando brillo/fondo dinámico.
- Logo y QR en carpeta `imagenes/`.

---

## Arquitectura del Sitio
- Framework: Astro o Next.js.
- Catálogo: Dos productos principales y variantes, cargados del lado del servidor para máxima velocidad.
- Sin pasarela de pago compleja: Experiencia ligera, sin pantallas de carga.

---

## Flujo de Compra Optimizado
1. **Escenario Principal:**
   - Logo tropical nocturno y 4 tarjetas visuales grandes (categorías).
   - Imágenes de alta calidad, fondos oscuros, colores vivos.
2. **Selección Interactiva:**
   - Acordeón líquido para variantes.
   - Granizados: "Sin Licor" y "Con Licor" (2 sabores cada uno).
   - Jugos Naturales: 4 sabores con íconos.
   - Latas de Cócteles: Carrusel horizontal con 5 sabores.
   - Torta de Zanahoria: Selector de cantidad.
   - Barra de Pedido Flotante: Mini-íconos y total acumulado con animación.
3. **Transición a Entrega:**
   - Botón "Programar Entrega" despliega input de dirección (Google Places), confirma cobertura en Caldas - Antioquia.
4. **Modal de Pago Dinámico:**
   - QR fijo en el centro, botones para copiar total y cuenta, botón "Enviar Pedido a WhatsApp".
   - Soporta compra mixta y genera mensaje de WhatsApp desglosado.

---

## Checkout con QR Asistido
- Modal de pago interactivo, QR fijo, total a transferir, botones para copiar monto y cuenta.
- Instrucciones claras: "1. Escanea y pega el monto. 2. Envía comprobante a WhatsApp".

---

## Cierre Automatizado en WhatsApp
- Mensaje estructurado, productos, dirección, método de pago y valor total.
- Ejemplo:

  🍹 ¡Hola Cocoloco! Acabo de hacer un pedido desde la web:
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🛒 PRODUCTO:
     • 1x Combo Cocoloco Original (Variante: Con Kit de Shots)
     • 1x Edición Especial Noche
  📍 DIRECCIÓN DE ENTREGA:
     • Calle 10A #34-12, El Poblado (Medellín)
     • Apto/Int: 402
     • Notas: Golpear duro, el timbre no sirve.
  💵 PAGO:
     • Método: Transferencia QR Fijo
     • Valor Total: $145.000
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  👉 Adjunto la captura de pantalla de la transferencia en este chat.

---

## Estrategia Técnica y de Negocio
- Sin mantenimiento crítico ni comisiones de pasarela.
- Control total del flujo de dinero.
- Experiencia emocional y memorable.
- Facilidad para agregar productos y variantes.
- Precio de domicilio estándar: $5.000 COP (ajustable por zona en el futuro).

---

## Productos Iniciales y Precios
- Granizados sin licor: $10.000 (2 sabores)
- Granizados con licor: $14.000 (2 sabores)
- Jugos naturales: $7.000 (4 sabores)
- Latas de cócteles: $30.000 (5 sabores)
- Torta de zanahoria: $5.000

---

## Consideraciones Futuras
- El sistema debe permitir agregar productos y variantes fácilmente.
- El valor del domicilio podrá variar según la zona de entrega, sin conflictos en el flujo de compra.

---

## Notas Finales
Este enfoque modular y visualmente impactante garantiza una experiencia de compra memorable, rápida y alineada con la identidad premium y provocativa de Cocoloco Drinks. El sistema está preparado para escalar en productos, variantes y ajustes logísticos sin sacrificar rendimiento ni experiencia de usuario.