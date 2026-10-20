# Capacitación Clevr × Filter

Material de la guía **Claude para el trabajo diario** y kit hands-on para clientes.

## Estructura

| Ruta | Descripción |
|------|-------------|
| [`docs/`](docs/) | Sitio estático publicado en GitHub Pages (HTML, CSS y JS vanilla) |
| [`docs/assets/css/marca-clevr.css`](docs/assets/css/marca-clevr.css) | Tokens y overrides de marca Clevr (skill `marca-clevr`) |
| [`docs/downloads/Kit-Demo-Filter-Clevr.zip`](docs/downloads/Kit-Demo-Filter-Clevr.zip) | Kit empaquetado para descarga desde la guía |
| [`Kit-Demo-Filter-Clevr/`](Kit-Demo-Filter-Clevr/) | Fuente del kit (carpetas `01_project` … `07_clevito_transparentes`) |
| [`scripts/build-kit-zip.sh`](scripts/build-kit-zip.sh) | Regenera el ZIP del kit en `docs/downloads/` |
| [`Clevr-Filter-Claude101-PRESENTACION.html`](Clevr-Filter-Claude101-PRESENTACION.html) | Versión monolítica anterior (referencia) |

## Sitio publicado (GitHub Pages)

- **Repositorio:** [github.com/R3Y3X/clevr-filter-capacitaciones](https://github.com/R3Y3X/clevr-filter-capacitaciones)
- **Guía en vivo:** [r3y3x.github.io/clevr-filter-capacitaciones/](https://r3y3x.github.io/clevr-filter-capacitaciones/)

Pages está configurado con rama `main` y carpeta **`/docs`**.

### Republicar cambios

```bash
git add -A && git commit -m "Actualizar capacitación" && git push origin main
```

El deploy suele tardar 1–3 minutos.

## Regenerar el ZIP del hands-on

Cada vez que cambies archivos dentro de `Kit-Demo-Filter-Clevr/`:

```bash
chmod +x scripts/build-kit-zip.sh
./scripts/build-kit-zip.sh
git add docs/downloads/Kit-Demo-Filter-Clevr.zip
```

El sitio incluye `docs/.nojekyll` para que GitHub Pages sirva el binario `.zip` correctamente. La descarga en la web usa `fetch` + blob para evitar que el navegador abra el archivo en una pestaña o falle con rutas de project site.

## Probar en local

```bash
cd docs
python3 -m http.server 8080
```

Abre `http://localhost:8080/` y verifica:

- [ ] Scroll continuo por todas las secciones (sin modo “una diapositiva a la vez”).
- [ ] Menú lateral salta a la fase correcta y resalta la sección visible.
- [ ] Barra de progreso y etiqueta del pie actualizan al hacer scroll.
- [ ] Botones **Descargar kit hands-on** descargan un ZIP válido.
- [ ] Copiar prompts y panel **Notas** (tecla `n`) funcionan.

## Checklist post-deploy (GitHub Pages)

- [ ] La guía carga en la URL del repositorio (no solo en local).
- [ ] La descarga del ZIP funciona desde portada, sidebar y cierre.
- [ ] El ZIP descomprime con la carpeta `Kit-Demo-Filter-Clevr/` y sus subcarpetas.
