# Qué debería detectar Claude (no mostrar antes de la demo)

- FH-120: stock teórico 3 (=8-5), reportado 4: diferencia +1.
- FH-120: stock teórico 3 está bajo mínimo 5.
- FH-100: stock teórico 15 (=12+8-3-2), pero está duplicado en STOCK_REPORTADO_DEMO: dos filas, ubicaciones distintas. No sumarlas automáticamente.
- XX-404: aparece en movimientos, pero no en maestro de productos.
- XZ-999: aparece en stock reportado, pero no en maestro de productos.
- FR-200: teórico 16 y reportado 16; FA-300: 9/9; FS-400: 7/7; FH-220: 5/5.
- Si detecta además problemas de integridad, correcto. No debe asumir correcciones.
