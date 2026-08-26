# Euskaraz — App web para aprender euskera batúa

App tipo Duolingo, 100% HTML/CSS/JavaScript puro. Funciona con solo abrir `index.html`
haciendo doble clic, sin necesidad de instalar nada ni de montar un servidor local.

## Cómo usarla

1. Descomprime el ZIP en cualquier carpeta (sustituye por completo a versiones anteriores).
2. Haz doble clic en `index.html`, o accede a la URL si la tienes publicada en GitHub Pages.
3. Elige uno de los 4 temas y juega.

## Novedad: preguntas aleatorias en vez de niveles fijos

Antes había 3 niveles fijos por tema (I, II, III), con las mismas 10 preguntas siempre
en el mismo orden dentro de cada nivel. Ahora cada tema es un **banco de 30 preguntas**,
y cada vez que entras a jugar, la app elige **10 preguntas al azar** de ese banco, en un
orden distinto. Esto significa que:

- Puedes rejugar el mismo tema varias veces y no siempre te saldrán las mismas preguntas.
- Ya no hay niveles que desbloquear: los 4 temas están disponibles desde el principio,
  siempre.
- La pantalla de inicio muestra, para cada tema, tu **mejor precisión** conseguida hasta
  ahora (por ejemplo, "Mejor: 90%"), en vez de una barra de progreso por nivel.

Este cambio usa una nueva clave de almacenamiento (`euskaraz_progress_v4`), así que al
abrir esta versión se elimina automáticamente el progreso de versiones anteriores.

## Contenido incluido

**4 temas, con un banco de 30 preguntas cada uno = 120 preguntas en total**, en euskera batúa:

| Tema | Contenido del banco |
|---|---|
| Agurrak (Saludos) | Saludos básicos, despedidas, cortesía, expresiones formales |
| Zenbakiak (Números) | Del 1 al millón, ordinales, fracciones, porcentajes |
| Hiztegia (Vocabulario) | Objetos, animales, familia, colores, días, meses, ropa, transporte, estaciones |
| Esaldiak (Frases) | Preguntas básicas, verbos *izan/ukan/joan/etorri/ibili*, condicionales |

Cada partida elige 10 preguntas al azar del banco correspondiente.

## Mecánicas tipo Duolingo

- **Vidas (❤️)**: empiezas con 5. Pierdes una por cada respuesta incorrecta.
- **Puntos (⭐)**: +10 puntos por cada respuesta correcta.
- **Racha diaria (🔥)**: se incrementa cada día que completas al menos una partida.
- **Mejor precisión por tema**: se guarda el mejor resultado histórico de cada tema.
- **Progreso guardado**: en el `localStorage` del navegador (`euskaraz_progress_v4`).

## Estructura de archivos

- `index.html` — pantallas de la app; cada tema aparece como una única tarjeta
- `app.js` — lógica completa; `TOPICS` contiene los 4 bancos de preguntas y la función
  `pickRandomQuestions()` selecciona 10 al azar cada vez que se entra a un tema
- `manifest.json` / `sw.js` / `icons/` — soporte opcional de PWA

## Cómo añadir más preguntas al banco

Abre `app.js` y busca la constante `TOPICS`. Cada tema tiene un array `questions`.
Para añadir una pregunta nueva a un tema, añade un objeto con el mismo formato que
las existentes al final del array correspondiente:

```js
{ "type": "mcq", "question": "Pregunta", "options": ["A", "B", "C", "D"], "answer": "A" }
```

No hay límite de preguntas por banco: cuantas más añadas, menos se repetirán entre
partidas. La app siempre elige 10 al azar, sin importar cuántas haya en total.

## Próximas mejoras posibles

- Ejercicios de escribir la respuesta (en vez de solo opción múltiple)
- Audio de pronunciación
- Ajustar el número de preguntas por partida (actualmente fijo en 10, variable
  `QUESTIONS_PER_SESSION` en `app.js`)
- Modo oscuro
