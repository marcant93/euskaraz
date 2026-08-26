# Euskaraz — App web para aprender euskera batúa

App tipo Duolingo, 100% HTML/CSS/JavaScript puro. Funciona con solo abrir `index.html`
haciendo doble clic, sin necesidad de instalar nada ni de montar un servidor local.

## Cómo usarla

1. Descomprime el ZIP en cualquier carpeta (sustituye por completo a versiones anteriores).
2. Haz doble clic en `index.html`.
3. Se abre en tu navegador por defecto y ya puedes jugar directamente.

## Novedad: desbloqueo independiente por tema

Antes, las 12 lecciones estaban encadenadas en una única secuencia: había que completar
Saludos I, II y III antes de poder tocar Números. Ahora cada uno de los 4 temas
(Agurrak, Zenbakiak, Hiztegia, Esaldiak) tiene su **Nivel 1 desbloqueado desde el
principio**, así que puedes elegir con qué tema empezar.

Dentro de cada tema, el orden sigue siendo progresivo: hay que completar el Nivel 1 de
un tema (con 60% de aciertos o más) para desbloquear su Nivel 2, y el Nivel 2 para
desbloquear el Nivel 3 de ese mismo tema. Pero los 4 temas ya no dependen entre sí.

Como este cambio afecta a cómo se guarda el progreso, la app usa una nueva clave de
almacenamiento (`euskaraz_progress_v3`) y elimina automáticamente cualquier progreso de
versiones anteriores al cargar, para evitar inconsistencias. Empezarás de cero de forma
limpia con las 5 vidas y los 4 primeros niveles ya disponibles.

## Reinicio manual de progreso

Sigue disponible el botón **"Reiniciar progreso y vidas"** al final de la pantalla de
inicio, con confirmación antes de borrar, por si quieres empezar de nuevo en cualquier
momento sin tocar la consola del navegador.

## Contenido incluido

**4 temas × 3 niveles cada uno = 12 unidades, 120 ejercicios en total**, en euskera batúa:

| Tema | Nivel 1 (desbloqueado) | Nivel 2 | Nivel 3 |
|---|---|---|---|
| Agurrak (Saludos) | Saludos básicos, gracias, despedidas | Presentaciones, deseos, cortesía | Frases hechas, expresiones formales |
| Zenbakiak (Números) | Del 1 al 20 | Decenas, cientos, ordinales | Miles, millones, fracciones, porcentajes |
| Hiztegia (Vocabulario) | Objetos, animales, naturaleza | Familia, colores, días, meses | Vocabulario administrativo y cívico |
| Esaldiak (Frases) | Preguntas básicas, sí/no | Verbo *izan*/*ukan*, tiempo, lugar | Subordinadas, condicionales, registro formal |

## Mecánicas tipo Duolingo

- **Vidas (❤️)**: empiezas con 5. Pierdes una por cada respuesta incorrecta.
- **Puntos (⭐)**: +10 puntos por cada respuesta correcta.
- **Racha diaria (🔥)**: se incrementa cada día que completas al menos un ejercicio.
- **Progreso guardado**: en el `localStorage` del navegador, bajo la clave
  `euskaraz_progress_v3`.

## Estructura de archivos

- `index.html` — pantallas de la app, agrupadas visualmente por tema, con el botón de reset
- `app.js` — lógica completa; `LESSONS` contiene las 12 unidades (cada una con un `key`
  textual estable); `TOPICS` define el agrupamiento visual y, ahora, también el ámbito
  del desbloqueo (cada tema se desbloquea de forma independiente)
- `manifest.json` / `sw.js` / `icons/` — soporte opcional de PWA

## Cómo añadir más niveles o temas

- Para añadir un nivel dentro de un tema existente: añade la unidad en `LESSONS` con un
  `key` nuevo (ej. `"agurrak-4"`) y añádelo al final del array `unitKeys` correspondiente
  en `TOPICS`. Quedará bloqueado hasta completar el nivel anterior de ese mismo tema.
- Para añadir un tema nuevo: crea un nuevo objeto en `TOPICS` con su propio `unitKeys`;
  su primer nivel quedará desbloqueado automáticamente, igual que los 4 temas actuales.

## Próximas mejoras posibles

- Ejercicios de escribir la respuesta (en vez de solo opción múltiple)
- Audio de pronunciación
- Nivel 4 con diálogos completos o textos administrativos en euskera
- Modo oscuro
