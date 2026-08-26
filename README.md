# Euskaraz — App web para aprender euskera batúa

App tipo Duolingo, 100% HTML/CSS/JavaScript puro. Funciona con solo abrir `index.html`
haciendo doble clic, sin necesidad de instalar nada ni de montar un servidor local.

## Novedad: ejercicio de emparejar

Se ha añadido un tercer tipo de ejercicio, además de opción múltiple y completar la
palabra: **emparejar columnas**. Aparecen 5 palabras en euskera (columna izquierda,
orden aleatorio) y sus 5 traducciones en español (columna derecha, orden aleatorio).
Tocas una palabra de cada columna; si forman pareja correcta, ambas se marcan en verde
y quedan fijas; si no, se resaltan un instante en rojo y puedes intentarlo de nuevo sin
penalización. Al completar las 5 parejas, se avanza automáticamente a la siguiente
pregunta.

Se han creado 12 grupos de 5 parejas (60 parejas en total), repartidos entre los 4
temas, usando vocabulario ya presente en el resto de la app (saludos, números,
vocabulario general, verbos básicos).

## Cómo usarla

1. Descomprime el ZIP en cualquier carpeta (sustituye por completo a versiones anteriores).
2. Haz doble clic en `index.html`, o accede a la URL si la tienes publicada en GitHub Pages.
3. Elige uno de los 4 temas y juega: 10 preguntas al azar de un banco más grande,
   mezclando los tres tipos de ejercicio.

## Contenido incluido

**4 temas**, con banco de preguntas de opción múltiple + completar palabra
(191 preguntas) más grupos de emparejar (12 grupos de 5 parejas):

| Tema | Preguntas (opción múltiple + completar) | Grupos de emparejar |
|---|---|---|
| Agurrak (Saludos) | 45 | 2 |
| Zenbakiak (Números) | 45 | 3 |
| Hiztegia (Vocabulario) | 51 | 5 |
| Esaldiak (Frases) | 50 | 2 |

Cada partida elige 10 preguntas al azar del banco combinado del tema correspondiente.

## Mecánicas actuales

- **Sin vidas ni sistema de racha/puntos**: la app se centra solo en practicar.
- **Mejor precisión por tema**: se guarda el mejor resultado histórico de cada tema.
- **Progreso guardado**: en el `localStorage` del navegador (`euskaraz_progress_v6`).
- **Atajo de teclado**: Enter comprueba/continúa en preguntas de opción múltiple y
  completar palabra, y en la pantalla de resultado final (no aplica al ejercicio de
  emparejar, que se resuelve tocando las columnas).
- **Logo**: ikurriña con una "E" estilizada, junto al nombre en la pantalla principal.

## Estructura de archivos

- `index.html` — pantallas de la app, incluida la interfaz de dos columnas para emparejar
- `app.js` — lógica completa; `TOPICS` contiene los bancos de preguntas de los 4 temas,
  mezclando los tipos `mcq`/`translate_*`, `fill_blank` y `match`
- `manifest.json` / `sw.js` — soporte opcional de PWA

## Cómo añadir más preguntas o grupos de emparejar

Abre `app.js` y busca la constante `TOPICS`. Cada tema tiene un array `questions`
donde puedes mezclar los tres tipos:

Opción múltiple:
```js
{ "type": "mcq", "question": "Pregunta", "options": ["A", "B", "C", "D"], "answer": "A" }
```

Completar la palabra:
```js
{ "type": "fill_blank", "question": "Frase con un ___ que falta.", "answer": "hueco", "hint": "Pista opcional" }
```

Emparejar (siempre 5 parejas):
```js
{ "type": "match", "pairs": [["euskera1", "español1"], ["euskera2", "español2"], ["euskera3", "español3"], ["euskera4", "español4"], ["euskera5", "español5"]] }
```

## Próximas mejoras posibles

- Ajustar el número de preguntas por partida (`QUESTIONS_PER_SESSION` en `app.js`)
- Audio de pronunciación
- Modo oscuro
