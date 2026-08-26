# Euskaraz — App web para aprender euskera batúa

App tipo Duolingo, 100% HTML/CSS/JavaScript puro. Funciona con solo abrir `index.html`
haciendo doble clic, sin necesidad de instalar nada ni de montar un servidor local.

## Sobre el bug reportado: "zaitezte" marcado como incorrecto

Se ha revisado a fondo el dato de esa pregunta concreta ("Zaindu ___ denok!") y la
respuesta almacenada es literalmente "zaitezte", sin espacios ni caracteres extraños,
verificado carácter por carácter. La función que compara tu respuesta también aplica
`trim()`, minúsculas y elimina acentos antes de comparar, así que en condiciones
normales "zaitezte" == "zaitezte" siempre debería dar como correcto.

Como no se ha podido reproducir el fallo de forma determinista, se han añadido dos
mejoras para blindar este caso y para poder diagnosticarlo mejor si vuelve a ocurrir:

1. El valor del campo de texto se lee justo en el instante de comprobar la respuesta
   (no antes), evitando cualquier posible desincronización entre el evento de teclado
   o clic y la lectura del texto escrito.
2. Si una respuesta de "completar la palabra" se marca como incorrecta, el mensaje de
   error ahora muestra **tanto la respuesta correcta como lo que escribiste
   exactamente**, entre comillas. Si esto vuelve a pasar, esa comparación visual te
   permitirá ver de inmediato si hay alguna diferencia sutil (un espacio, una letra
   distinta) que antes no se veía.

Si el problema persiste con este mensaje visible, compártelo y podremos identificar la
causa exacta con datos concretos en vez de suposiciones.

## Cómo usarla

1. Descomprime el ZIP en cualquier carpeta (sustituye por completo a versiones anteriores).
2. Haz doble clic en `index.html`, o accede a la URL si la tienes publicada en GitHub Pages.
3. Elige uno de los 4 temas y juega: 10 preguntas al azar de un banco más grande.

## Contenido incluido

**4 temas, con un banco ampliado de preguntas cada uno = 191 preguntas en total**:

| Tema | Preguntas en el banco |
|---|---|
| Agurrak (Saludos) | 45 |
| Zenbakiak (Números) | 45 |
| Hiztegia (Vocabulario) | 51 |
| Esaldiak (Frases) | 50 |

## Mecánicas actuales

- **Sin vidas ni sistema de racha/puntos**: la app se centra solo en practicar.
- **Mejor precisión por tema**: se guarda el mejor resultado histórico de cada tema.
- **Progreso guardado**: en el `localStorage` del navegador (`euskaraz_progress_v6`).
- **Atajo de teclado**: Enter comprueba/continúa en cada pregunta y en la pantalla
  de resultado final.
- **Logo**: ikurriña con una "E" estilizada, junto al nombre en la pantalla principal.

## Estructura de archivos

- `index.html` — pantallas de la app, con el logo SVG embebido junto al título
- `app.js` — lógica completa; `TOPICS` contiene los 4 bancos de preguntas
- `manifest.json` / `sw.js` — soporte opcional de PWA

## Cómo añadir más preguntas al banco

Abre `app.js` y busca la constante `TOPICS`. Cada tema tiene un array `questions`:

Opción múltiple:
```js
{ "type": "mcq", "question": "Pregunta", "options": ["A", "B", "C", "D"], "answer": "A" }
```

Completar la palabra:
```js
{ "type": "fill_blank", "question": "Frase con un ___ que falta.", "answer": "hueco", "hint": "Pista opcional" }
```

## Próximas mejoras posibles

- Ajustar el número de preguntas por partida (`QUESTIONS_PER_SESSION` en `app.js`)
- Audio de pronunciación
- Modo oscuro
