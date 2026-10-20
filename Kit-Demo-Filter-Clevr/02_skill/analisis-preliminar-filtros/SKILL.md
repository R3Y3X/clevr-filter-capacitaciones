---
name: analisis-preliminar-filtros
# Identificador de demo; esta Skill puede importarse a Claude cuando el entorno lo permita.
description: Compara solicitudes de filtración industrial con catálogos aportados, identifica datos faltantes y redacta comparaciones preliminares con fuentes y restricciones técnicas. Úsala cuando el usuario pida evaluar, comparar o preparar una respuesta sobre filtros.
---

# Comparador preliminar de filtración — Clevr × Filter (DEMO)

**Alcance:** demostración educativa con datos ficticios, sin equivalencias certificadas ni autorizaciones técnicas.

## Entradas
- Solicitud del cliente con valores numéricos y unidades.
- Catálogo, fichas o tabla de productos aportados.
- Cualquier condición de instalación conocida.

## Proceso obligatorio
1. Extrae parámetros y unidades; no conviertas micraje nominal en absoluto sin respaldo.
2. Busca candidatos solamente en las fuentes aportadas.
3. Evalúa cada criterio numérico explícito: caudal máximo >= requerido, presión máxima >= requerida, micraje igual a solicitado solo como comparación preliminar (explica que no prueba equivalencia de eficiencia).
4. Marca criterios ausentes: conexión, sello, dimensiones, tipo de fluido, rango térmico, diferencial de presión, bypass y estándares aplicables.
5. Si falta un campo en el catálogo, marca **No informado**, no inventes.
6. Presenta tabla comparativa con fuente/código de referencia, incumplimientos y dudas.
7. Redacta un **borrador** de email comercial <= 120 palabras sin asegurar compatibilidad ni disponibilidad.
8. Termina con las verificaciones que debe realizar una persona técnica antes de seleccionar el filtro.

## Salida
**Resumen:** requerimiento y alcance.

**Tabla:** código | tipo | caudal | presión | micraje | conexión | evaluación preliminar | fuente.

**Datos pendientes:** preguntas necesarias.

**Borrador comercial:** tono claro y profesional, sin compromisos de compatibilidad.

**Advertencia:** «Comparación educativa o preliminar; validar con ficha oficial y personal técnico».

## Reglas
- Nunca atribuyas los códigos ficticios a productos reales de Filter.
- No inventes precios, stock, características o equivalencias.
- Distingue entre coincidencia de umbrales numéricos y aptitud para la aplicación.
- No ejecutes compras ni envíes emails sin autorización explícita.
