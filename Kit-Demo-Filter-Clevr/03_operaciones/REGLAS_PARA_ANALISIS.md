# Análisis de bodega — reglas de la demo

Archivos: PRODUCTOS_DEMO.csv, MOVIMIENTOS_DEMO.csv y STOCK_REPORTADO_DEMO.csv.

- Stock teórico = stock inicial + ENTRADA - SALIDA.
- Usar `sku` como clave. Reportar códigos de movimiento o de stock sin maestro de productos.
- Reportar duplicados de SKU en stock informado y NO sumar esas filas automáticamente, porque tienen ubicaciones distintas y podría ser doble conteo.
- Señalar diferencias, indicando la hipótesis de conciliación (no resolverlas silenciosamente).
- Reportar productos bajo mínimo usando stock teórico cuando sea posible.
- Nunca editar archivos originales ni crear compras automáticas.
- Todo es ficticio.

## Prompt para Claude / Cowork
Analiza los tres CSV adjuntos; calcula el stock teórico por SKU, detecta diferencias respecto al stock reportado, filas duplicadas y SKUs desconocidos. Genera una tabla de hallazgos, un archivo conciliado y tres acciones sugeridas para una persona. No modifiques originales ni sumes duplicados automáticamente.
