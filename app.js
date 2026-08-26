// ===== Euskaraz - App de aprendizaje de euskera =====
//
// NUEVO TIPO DE EJERCICIO: "match" (emparejar).
// Cada pregunta de este tipo tiene un array "pairs" de 5 parejas
// [euskera, español]. Se muestran las 5 palabras en euskera en la columna
// izquierda (orden aleatorio) y las 5 traducciones en la columna derecha
// (orden aleatorio, distinto). El usuario toca una palabra de cada columna;
// si forman pareja correcta, ambas se marcan como "matched" y quedan fijas;
// si no, se resaltan brevemente en rojo y se deseleccionan (sin penalizacion,
// puede reintentarlo). Al completar las 5 parejas se considera la pregunta
// resuelta (cuenta como 1 acierto en el resultado final, ya que no hay
// "fallo" real posible en este tipo, solo tiempo).
//
// El banco de cada tema ahora mezcla tres tipos: "mcq"/"translate_*"
// (opcion multiple), "fill_blank" (completar palabra) y "match" (emparejar).

const STORAGE_KEY = 'euskaraz_progress_v6';
const OLD_STORAGE_KEYS = ['euskaraz_progress_v1', 'euskaraz_progress_v2', 'euskaraz_progress_v3', 'euskaraz_progress_v4', 'euskaraz_progress_v5'];
const QUESTIONS_PER_SESSION = 10;

const TOPICS = [
  {
    "key": "agurrak",
    "name": "Agurrak",
    "subtitle": "Saludos",
    "icon": "👋",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Hola' en euskera?",
        "options": [
          "Kaixo",
          "Agur",
          "Bai",
          "Ez"
        ],
        "answer": "Kaixo"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Agur'?",
        "options": [
          "Hola",
          "Adiós",
          "Gracias",
          "Buenos días"
        ],
        "answer": "Adiós"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Buenos días'?",
        "options": [
          "Gabon",
          "Egun on",
          "Arratsalde on",
          "Kaixo"
        ],
        "answer": "Egun on"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Arratsalde on'",
        "answer": "Buenas tardes",
        "options": [
          "Buenas tardes",
          "Buenas noches",
          "Buenos días",
          "Hasta luego"
        ]
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Gabon'",
        "answer": "Buenas noches",
        "options": [
          "Buenos días",
          "Buenas noches",
          "Hola",
          "Adiós"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice '¿Qué tal?'",
        "options": [
          "Zer moduz?",
          "Nor zara?",
          "Zenbat da?",
          "Non dago?"
        ],
        "answer": "Zer moduz?"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Hasta luego'",
        "answer": "Gero arte",
        "options": [
          "Gero arte",
          "Bihar arte",
          "Agur",
          "Egun on"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Eskerrik asko'?",
        "options": [
          "De nada",
          "Por favor",
          "Muchas gracias",
          "Perdón"
        ],
        "answer": "Muchas gracias"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'De nada'",
        "answer": "Ez horregatik",
        "options": [
          "Ez horregatik",
          "Mesedez",
          "Barkatu",
          "Bai"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Buenas noches' de despedida?",
        "options": [
          "Gabon",
          "Egun on",
          "Kaixo",
          "Agur"
        ],
        "answer": "Gabon"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Encantado/a de conocerte'?",
        "options": [
          "Atsegin da zu ezagutzea",
          "Zer moduz?",
          "Ongi nago",
          "Gero arte"
        ],
        "answer": "Atsegin da zu ezagutzea"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ongi, eta zu?'",
        "answer": "Bien, ¿y tú?",
        "options": [
          "Bien, ¿y tú?",
          "Mal, ¿y tú?",
          "¿Cómo estás?",
          "Muchas gracias"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Hasta mañana'?",
        "options": [
          "Bihar arte",
          "Gero arte",
          "Agur",
          "Ikusi arte"
        ],
        "answer": "Bihar arte"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Buenas tardes a todos'",
        "answer": "Arratsalde on guztioi",
        "options": [
          "Arratsalde on guztioi",
          "Egun on guztioi",
          "Gabon guztioi",
          "Kaixo guztioi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ondo pasa!'?",
        "options": [
          "¡Que te vaya bien!",
          "¡Buenos días!",
          "¡Adiós!",
          "¡Cuídate!"
        ],
        "answer": "¡Que te vaya bien!"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zaindu zaitez'",
        "answer": "Cuídate",
        "options": [
          "Cuídate",
          "Adiós",
          "Buena suerte",
          "Hasta pronto"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Mucho gusto' (formal)?",
        "options": [
          "Pozten naiz",
          "Barkatu",
          "Mesedez",
          "Ez horregatik"
        ],
        "answer": "Pozten naiz"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Bienvenido/a'",
        "answer": "Ongi etorri",
        "options": [
          "Ongi etorri",
          "Ongi nago",
          "Ongi da",
          "Ongi joan"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ikusi arte'?",
        "options": [
          "Hasta la vista",
          "Buenos días",
          "Bienvenido",
          "Por favor"
        ],
        "answer": "Hasta la vista"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zorte on!'",
        "answer": "¡Buena suerte!",
        "options": [
          "¡Buena suerte!",
          "¡Feliz cumpleaños!",
          "¡Buen provecho!",
          "¡Enhorabuena!"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Espero verte pronto'?",
        "options": [
          "Laster ikusiko dut zu",
          "Laster ikusiko zaitut",
          "Gero ikusiko zaitut",
          "Bihar ikusiko dut"
        ],
        "answer": "Laster ikusiko zaitut"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Milesker etortzeagatik'",
        "answer": "Gracias por venir",
        "options": [
          "Gracias por venir",
          "Gracias por todo",
          "Bienvenido de nuevo",
          "Hasta la próxima"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Que tengas un buen día'?",
        "options": [
          "Egun on izan",
          "Egun ona izan dezazula",
          "Egun ona da",
          "Egun on guztiei"
        ],
        "answer": "Egun ona izan dezazula"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Ha sido un placer conocerte'",
        "answer": "Plazer bat izan da zu ezagutzea",
        "options": [
          "Plazer bat izan da zu ezagutzea",
          "Atsegin da zu ezagutzea",
          "Ongi etorri",
          "Poztu naiz zurekin"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Harik eta berriz elkar ikusi arte'?",
        "options": [
          "Hasta que nos volvamos a ver",
          "Hasta luego",
          "Nos vemos mañana",
          "Cuídate mucho"
        ],
        "answer": "Hasta que nos volvamos a ver"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Eskerrik asko bihotz-bihotzez'",
        "answer": "Muchas gracias de corazón",
        "options": [
          "Muchas gracias de corazón",
          "Muchas gracias por todo",
          "Gracias otra vez",
          "De nada en absoluto"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Siento mucho el retraso'?",
        "options": [
          "Barkatu berandu iritsi izana",
          "Barkatu asko",
          "Ez dut ulertzen",
          "Mesedez itxaron"
        ],
        "answer": "Barkatu berandu iritsi izana"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Cuídense todos'",
        "answer": "Zaindu zaitezte denok",
        "options": [
          "Zaindu zaitezte denok",
          "Zaindu zaitez ondo",
          "Ongi egon zaitezte",
          "Ondo pasa denok"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Laster arte, bada'?",
        "options": [
          "Hasta pronto, entonces",
          "Buenos días a todos",
          "Ha sido un placer",
          "Cuídate mucho, amigo"
        ],
        "answer": "Hasta pronto, entonces"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ondo etorriak izan zaitezte gure etxera'",
        "answer": "Sed bienvenidos a nuestra casa",
        "options": [
          "Sed bienvenidos a nuestra casa",
          "Cuidad bien la casa",
          "Volved pronto a casa",
          "Buenas noches en casa"
        ]
      },
      {
        "type": "fill_blank",
        "question": "___, zer moduz?  (Hola, ¿qué tal?)",
        "answer": "Kaixo",
        "hint": "Saludo informal de 'hola'"
      },
      {
        "type": "fill_blank",
        "question": "___ on, nola zaude?  (Buenos días, ¿cómo estás?)",
        "answer": "Egun",
        "hint": "Egun ___ = buenos días"
      },
      {
        "type": "fill_blank",
        "question": "Arratsalde ___, guztioi!  (¡Buenas tardes a todos!)",
        "answer": "on",
        "hint": "Se repite en 'egun on' y 'gabon'"
      },
      {
        "type": "fill_blank",
        "question": "Eskerrik ___!  (¡Muchas gracias!)",
        "answer": "asko",
        "hint": "Eskerrik ___ = muchas gracias"
      },
      {
        "type": "fill_blank",
        "question": "Ez ___!  (¡De nada!, literalmente 'no por eso')",
        "answer": "horregatik",
        "hint": "Ez ___ = de nada"
      },
      {
        "type": "fill_blank",
        "question": "Gero ___!  (¡Hasta luego!)",
        "answer": "arte",
        "hint": "Gero ___ = hasta luego"
      },
      {
        "type": "fill_blank",
        "question": "___ arte, lagun!  (¡Hasta mañana, amigo!)",
        "answer": "Bihar",
        "hint": "Significa 'mañana' (el día siguiente)"
      },
      {
        "type": "fill_blank",
        "question": "Ondo ___!  (¡Que te vaya bien!)",
        "answer": "pasa",
        "hint": "Ondo ___ = que te vaya bien"
      },
      {
        "type": "fill_blank",
        "question": "___ naiz zu ezagutzeaz.  (Me alegro de conocerte.)",
        "answer": "Pozten",
        "hint": "Presente del verbo poztu (alegrarse): pozten + naiz"
      },
      {
        "type": "fill_blank",
        "question": "Ongi ___ gure etxera!  (¡Bienvenido a nuestra casa!)",
        "answer": "etorri",
        "hint": "Ongi ___ = bienvenido"
      },
      {
        "type": "fill_blank",
        "question": "Ikusi ___!  (¡Hasta la vista!)",
        "answer": "arte",
        "hint": "Se repite también en 'gero arte'"
      },
      {
        "type": "fill_blank",
        "question": "Zorte ___!  (¡Buena suerte!)",
        "answer": "on",
        "hint": "Zorte ___ = buena suerte"
      },
      {
        "type": "fill_blank",
        "question": "Laster ___ zaitut.  (Espero verte pronto.)",
        "answer": "ikusiko",
        "hint": "Futuro del verbo 'ikusi' (ver)"
      },
      {
        "type": "fill_blank",
        "question": "___ berandu iritsi izana.  (Siento mucho el retraso.)",
        "answer": "Barkatu",
        "hint": "Significa 'perdón' o 'disculpa'"
      },
      {
        "type": "fill_blank",
        "question": "Zaindu ___ denok!  (¡Cuídense todos!)",
        "answer": "zaitezte",
        "hint": "Forma de 'cuidarse' en plural, imperativo"
      },
      {
        "type": "match",
        "pairs": [
          [
            "Kaixo",
            "Hola"
          ],
          [
            "Agur",
            "Adiós"
          ],
          [
            "Egun on",
            "Buenos días"
          ],
          [
            "Eskerrik asko",
            "Muchas gracias"
          ],
          [
            "Barkatu",
            "Perdón"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Gabon",
            "Buenas noches"
          ],
          [
            "Arratsalde on",
            "Buenas tardes"
          ],
          [
            "Mesedez",
            "Por favor"
          ],
          [
            "Ongi etorri",
            "Bienvenido"
          ],
          [
            "Zorte on",
            "Buena suerte"
          ]
        ]
      }
    ]
  },
  {
    "key": "zenbakiak",
    "name": "Zenbakiak",
    "subtitle": "Números",
    "icon": "🔢",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'uno' en euskera?",
        "options": [
          "Bat",
          "Bi",
          "Hiru",
          "Lau"
        ],
        "answer": "Bat"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'cinco'?",
        "options": [
          "Lau",
          "Bost",
          "Sei",
          "Zazpi"
        ],
        "answer": "Bost"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hiru'",
        "answer": "Tres",
        "options": [
          "Dos",
          "Tres",
          "Cuatro",
          "Cinco"
        ]
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zazpi'",
        "answer": "Siete",
        "options": [
          "Seis",
          "Siete",
          "Ocho",
          "Nueve"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'diez'?",
        "options": [
          "Bederatzi",
          "Hamar",
          "Hamaika",
          "Hogei"
        ],
        "answer": "Hamar"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'ocho'",
        "answer": "Zortzi",
        "options": [
          "Zazpi",
          "Zortzi",
          "Bederatzi",
          "Sei"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué número es 'Hogei'?",
        "options": [
          "Doce",
          "Quince",
          "Veinte",
          "Diez"
        ],
        "answer": "Veinte"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'cuatro'",
        "answer": "Lau",
        "options": [
          "Hiru",
          "Lau",
          "Bost",
          "Bi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'nueve'?",
        "options": [
          "Zortzi",
          "Bederatzi",
          "Hamar",
          "Sei"
        ],
        "answer": "Bederatzi"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hamabi'",
        "answer": "Doce",
        "options": [
          "Once",
          "Doce",
          "Trece",
          "Catorce"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'treinta'?",
        "options": [
          "Hogeita hamar",
          "Berrogei",
          "Hirurogei",
          "Hemeretzi"
        ],
        "answer": "Hogeita hamar"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Berrogei'",
        "answer": "Cuarenta",
        "options": [
          "Treinta",
          "Cuarenta",
          "Cincuenta",
          "Sesenta"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'cien'?",
        "options": [
          "Ehun",
          "Mila",
          "Berrehun",
          "Hogei"
        ],
        "answer": "Ehun"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'veintidós' (20+2)",
        "answer": "Hogeita bi",
        "options": [
          "Hogeita bi",
          "Hogeita hamar",
          "Hamabi",
          "Berrogeita bi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Hirurogei'?",
        "options": [
          "Treinta",
          "Cuarenta",
          "Sesenta",
          "Setenta"
        ],
        "answer": "Sesenta"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Mila'",
        "answer": "Mil",
        "options": [
          "Cien",
          "Quinientos",
          "Mil",
          "Diez mil"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'primero' (ordinal)?",
        "options": [
          "Lehena",
          "Bigarrena",
          "Hirugarrena",
          "Azkena"
        ],
        "answer": "Lehena"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'segundo' (ordinal)",
        "answer": "Bigarrena",
        "options": [
          "Bigarrena",
          "Hirugarrena",
          "Lehena",
          "Laugarrena"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué número es 'Laurogei'?",
        "options": [
          "Setenta",
          "Ochenta",
          "Noventa",
          "Sesenta"
        ],
        "answer": "Ochenta"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hirurogeita hamar'",
        "answer": "Setenta",
        "options": [
          "Sesenta",
          "Setenta",
          "Ochenta",
          "Noventa"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'quinientos'?",
        "options": [
          "Bostehun",
          "Bosteun",
          "Bost mila",
          "Bosgarren"
        ],
        "answer": "Bostehun"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Bi mila eta hogeita sei'",
        "answer": "Dos mil veintiséis",
        "options": [
          "Dos mil veintiséis",
          "Dos mil dieciséis",
          "Doscientos veintiséis",
          "Veinte mil seis"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'un millón'?",
        "options": [
          "Milioi bat",
          "Mila mila",
          "Ehun mila",
          "Milaka bat"
        ],
        "answer": "Milioi bat"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'último' (ordinal)",
        "answer": "Azkena",
        "options": [
          "Azkena",
          "Lehena",
          "Erdikoa",
          "Hurrengoa"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Erdia'?",
        "options": [
          "El doble",
          "La mitad",
          "El tercio",
          "El total"
        ],
        "answer": "La mitad"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hiru laurden'",
        "answer": "Tres cuartos",
        "options": [
          "Tres cuartos",
          "Un tercio",
          "Media docena",
          "Tres décimas"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'décimo' (ordinal)?",
        "options": [
          "Hamargarrena",
          "Hamarrena",
          "Hamaikagarrena",
          "Bederatzigarrena"
        ],
        "answer": "Hamargarrena"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'novecientos noventa y nueve'",
        "answer": "Bederatziehun eta laurogeita hemeretzi",
        "options": [
          "Bederatziehun eta laurogeita hemeretzi",
          "Bederatzi mila eta laurogeita hemeretzi",
          "Bederatziehun eta hirurogeita hemeretzi",
          "Zortziehun eta laurogeita hemeretzi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Docena' en euskera?",
        "options": [
          "Dozena",
          "Hamabiko",
          "Talde bat",
          "Sail bat"
        ],
        "answer": "Dozena"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ehuneko hogei'",
        "answer": "Veinte por ciento",
        "options": [
          "Veinte por ciento",
          "Cien entre veinte",
          "Veinte de cien",
          "Ciento veinte"
        ]
      },
      {
        "type": "fill_blank",
        "question": "Lagun ___ (1) dut hemen.  (Tengo un amigo aquí.)",
        "answer": "bat",
        "hint": "El número 1: 'bat' va DETRÁS del sustantivo (lagun bat)"
      },
      {
        "type": "fill_blank",
        "question": "___ (5) ordu daramat lanean.  (Llevo 5 horas trabajando.)",
        "answer": "Bost",
        "hint": "El número 5 (va delante, como el resto salvo 'bat')"
      },
      {
        "type": "fill_blank",
        "question": "___ (10) euro balio du.  (Vale 10 euros.)",
        "answer": "Hamar",
        "hint": "El número 10"
      },
      {
        "type": "fill_blank",
        "question": "___ (20) urte ditut.  (Tengo 20 años.)",
        "answer": "Hogei",
        "hint": "El número 20"
      },
      {
        "type": "fill_blank",
        "question": "___ (30) minutu barru.  (En 30 minutos.)",
        "answer": "Hogeita hamar",
        "hint": "20 + 10"
      },
      {
        "type": "fill_blank",
        "question": "___ (100) pertsona zeuden.  (Había 100 personas.)",
        "answer": "Ehun",
        "hint": "El número 100"
      },
      {
        "type": "fill_blank",
        "question": "___ (1000) euro kostatzen da.  (Cuesta 1000 euros.)",
        "answer": "Mila",
        "hint": "El número 1000"
      },
      {
        "type": "fill_blank",
        "question": "___ (60) urte ditu aitonak.  (El abuelo tiene 60 años.)",
        "answer": "Hirurogei",
        "hint": "El número 60"
      },
      {
        "type": "fill_blank",
        "question": "___ (80) liburu ditu liburutegian.  (Tiene 80 libros en la biblioteca.)",
        "answer": "Laurogei",
        "hint": "El número 80"
      },
      {
        "type": "fill_blank",
        "question": "___ mailakoa da.  (Es de primer nivel/grado.)",
        "answer": "Lehen",
        "hint": "Ordinal 'primero', forma corta"
      },
      {
        "type": "fill_blank",
        "question": "Hori da ___ aldiz esaten dudana.  (Es la segunda vez que lo digo.)",
        "answer": "bigarren",
        "hint": "Ordinal 'segundo'"
      },
      {
        "type": "fill_blank",
        "question": "___ (12) hilabete ditu urte batek.  (Un año tiene 12 meses.)",
        "answer": "Hamabi",
        "hint": "El número 12"
      },
      {
        "type": "fill_blank",
        "question": "Tartaren ___ jan dut.  (Me he comido la mitad de la tarta.)",
        "answer": "erdia",
        "hint": "Significa 'la mitad' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "Ehuneko ___ (20) deskontua dago.  (Hay un 20% de descuento.)",
        "answer": "hogei",
        "hint": "El número 20"
      },
      {
        "type": "fill_blank",
        "question": "Pertsona ___ (1000000) bizi dira hirian.  (Un millón de personas viven en la ciudad.)",
        "answer": "milioi bat",
        "hint": "Un millón: 'bat' va detrás de 'milioi'"
      },
      {
        "type": "match",
        "pairs": [
          [
            "Bat",
            "Uno"
          ],
          [
            "Bi",
            "Dos"
          ],
          [
            "Hiru",
            "Tres"
          ],
          [
            "Lau",
            "Cuatro"
          ],
          [
            "Bost",
            "Cinco"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Sei",
            "Seis"
          ],
          [
            "Zazpi",
            "Siete"
          ],
          [
            "Zortzi",
            "Ocho"
          ],
          [
            "Bederatzi",
            "Nueve"
          ],
          [
            "Hamar",
            "Diez"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Hogei",
            "Veinte"
          ],
          [
            "Hirurogei",
            "Sesenta"
          ],
          [
            "Ehun",
            "Cien"
          ],
          [
            "Mila",
            "Mil"
          ],
          [
            "Erdia",
            "La mitad"
          ]
        ]
      }
    ]
  },
  {
    "key": "hiztegia",
    "name": "Oinarrizko hiztegia",
    "subtitle": "Vocabulario",
    "icon": "📚",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'agua'?",
        "options": [
          "Ur",
          "Su",
          "Lur",
          "Aire"
        ],
        "answer": "Ur"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Etxe'?",
        "options": [
          "Coche",
          "Casa",
          "Calle",
          "Ciudad"
        ],
        "answer": "Casa"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Lagun'",
        "answer": "Amigo",
        "options": [
          "Amigo",
          "Familia",
          "Vecino",
          "Hermano"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'pan'",
        "answer": "Ogi",
        "options": [
          "Ogi",
          "Ur",
          "Esne",
          "Sagar"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'perro'?",
        "options": [
          "Katu",
          "Txakur",
          "Zaldi",
          "Behi"
        ],
        "answer": "Txakur"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Eguzki'?",
        "options": [
          "Luna",
          "Estrella",
          "Sol",
          "Cielo"
        ],
        "answer": "Sol"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Mendi'",
        "answer": "Montaña",
        "options": [
          "Río",
          "Mar",
          "Montaña",
          "Bosque"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'libro'",
        "answer": "Liburu",
        "options": [
          "Liburu",
          "Mahai",
          "Aulki",
          "Leiho"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'mesa'?",
        "options": [
          "Aulki",
          "Mahai",
          "Leiho",
          "Ate"
        ],
        "answer": "Mahai"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Sagar'",
        "answer": "Manzana",
        "options": [
          "Pera",
          "Manzana",
          "Naranja",
          "Uva"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'madre'?",
        "options": [
          "Ama",
          "Aita",
          "Anaia",
          "Arreba"
        ],
        "answer": "Ama"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Aita'",
        "answer": "Padre",
        "options": [
          "Padre",
          "Hermano",
          "Abuelo",
          "Tío"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'hermano' (de hombre)?",
        "options": [
          "Anaia",
          "Arreba",
          "Neba",
          "Ahizpa"
        ],
        "answer": "Anaia"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'color rojo'",
        "answer": "Gorria",
        "options": [
          "Gorria",
          "Urdina",
          "Horia",
          "Berdea"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Urdin'?",
        "options": [
          "Verde",
          "Azul",
          "Amarillo",
          "Blanco"
        ],
        "answer": "Azul"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Astelehen'",
        "answer": "Lunes",
        "options": [
          "Lunes",
          "Martes",
          "Miércoles",
          "Domingo"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'viernes'?",
        "options": [
          "Osteguna",
          "Ostirala",
          "Larunbata",
          "Igandea"
        ],
        "answer": "Ostirala"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'enero'",
        "answer": "Urtarrila",
        "options": [
          "Urtarrila",
          "Otsaila",
          "Martxoa",
          "Abendua"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Berdea'?",
        "options": [
          "Verde",
          "Marrón",
          "Negro",
          "Gris"
        ],
        "answer": "Verde"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Abendua'",
        "answer": "Diciembre",
        "options": [
          "Noviembre",
          "Diciembre",
          "Octubre",
          "Enero"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'gato'?",
        "options": [
          "Katu",
          "Txakur",
          "Zaldi",
          "Untxi"
        ],
        "answer": "Katu"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zaldi'",
        "answer": "Caballo",
        "options": [
          "Vaca",
          "Caballo",
          "Oveja",
          "Cerdo"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'camiseta'?",
        "options": [
          "Kamiseta",
          "Praka",
          "Jaka",
          "Zapata"
        ],
        "answer": "Kamiseta"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'zapatos'",
        "answer": "Zapatak",
        "options": [
          "Zapatak",
          "Prakak",
          "Jakak",
          "Galtzerdiak"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Autobusa'?",
        "options": [
          "Coche",
          "Autobús",
          "Tren",
          "Bicicleta"
        ],
        "answer": "Autobús"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hegazkin'",
        "answer": "Avión",
        "options": [
          "Barco",
          "Avión",
          "Tren",
          "Coche"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'primavera'?",
        "options": [
          "Udaberri",
          "Uda",
          "Udazken",
          "Negu"
        ],
        "answer": "Udaberri"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'invierno'",
        "answer": "Negu",
        "options": [
          "Negu",
          "Uda",
          "Udazken",
          "Udaberri"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Udazken'?",
        "options": [
          "Verano",
          "Otoño",
          "Primavera",
          "Invierno"
        ],
        "answer": "Otoño"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Eguraldia'",
        "answer": "El tiempo (clima)",
        "options": [
          "El tiempo (clima)",
          "El día",
          "La estación",
          "El calendario"
        ]
      },
      {
        "type": "fill_blank",
        "question": "___ edan behar dut, egarri naiz.  (Necesito beber agua, tengo sed.)",
        "answer": "Ura",
        "hint": "Significa 'agua' (con artículo, forma declinada de 'ur')"
      },
      {
        "type": "fill_blank",
        "question": "Gure ___ handia da.  (Nuestra casa es grande.)",
        "answer": "etxea",
        "hint": "Significa 'casa' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ Bilbon bizi da.  (Mi amigo vive en Bilbao.)",
        "answer": "laguna",
        "hint": "Significa 'amigo' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "Goizean ___ jaten dut.  (Por la mañana como pan.)",
        "answer": "ogia",
        "hint": "Significa 'pan' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ oso alaia da.  (Mi perro es muy alegre.)",
        "answer": "txakurra",
        "hint": "Significa 'perro' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "___ oso beroa dago gaur.  (El sol está muy fuerte hoy.)",
        "answer": "Eguzkia",
        "hint": "Significa 'sol' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "___ handia dago herriaren ondoan.  (Hay una montaña grande junto al pueblo.)",
        "answer": "Mendi",
        "hint": "Significa 'montaña' (sin artículo, forma indeterminada tras 'handia')"
      },
      {
        "type": "fill_blank",
        "question": "___ bat irakurtzen dut gauero.  (Leo un libro todas las noches.)",
        "answer": "Liburu",
        "hint": "Significa 'libro' (sin artículo, va seguido de 'bat')"
      },
      {
        "type": "fill_blank",
        "question": "___ gaineko sagarra hartu dut.  (He cogido la manzana de encima de la mesa.)",
        "answer": "Mahai",
        "hint": "Significa 'mesa' (sin artículo, como complemento)"
      },
      {
        "type": "fill_blank",
        "question": "Ene ___ Bilbon bizi da.  (Mi madre vive en Bilbao.)",
        "answer": "ama",
        "hint": "Significa 'madre' (sin artículo tras 'ene')"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ medikua da.  (Mi padre es médico.)",
        "answer": "aita",
        "hint": "Significa 'padre' (sin artículo tras 'nire')"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ berdea da.  (Mi coche es verde.)",
        "answer": "autoa",
        "hint": "Significa 'coche' (con artículo); 'berdea' ya está escrito en la frase"
      },
      {
        "type": "fill_blank",
        "question": "Zeruaren kolorea ___ da.  (El color del cielo es azul.)",
        "answer": "urdina",
        "hint": "Significa 'azul' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "___ da gaur.  (Hoy es lunes.)",
        "answer": "Astelehena",
        "hint": "Significa 'lunes' (con artículo, como predicado)"
      },
      {
        "type": "fill_blank",
        "question": "___ joango gara zinemara.  (El viernes iremos al cine.)",
        "answer": "Ostiralean",
        "hint": "Significa 'el viernes' (en/durante)"
      },
      {
        "type": "fill_blank",
        "question": "___ hasten da urtea.  (El año comienza en enero.)",
        "answer": "Urtarrilean",
        "hint": "Significa 'en enero'"
      },
      {
        "type": "fill_blank",
        "question": "Nire autoaren kolorea ___ da.  (El color de mi coche es verde.)",
        "answer": "berdea",
        "hint": "Significa 'verde' (con artículo, como predicado)"
      },
      {
        "type": "fill_blank",
        "question": "___ maite dut, oso alaia da.  (Me gusta el gato, es muy alegre.)",
        "answer": "Katua",
        "hint": "Significa 'gato' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "___ hartu dugu Madrilera joateko.  (Hemos cogido el avión para ir a Madrid.)",
        "answer": "Hegazkina",
        "hint": "Significa 'avión' (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "___ loreak ateratzen dira.  (En primavera salen las flores.)",
        "answer": "Udaberrian",
        "hint": "Significa 'en primavera'"
      },
      {
        "type": "fill_blank",
        "question": "___ elurra egiten du askotan.  (En invierno nieva a menudo.)",
        "answer": "Neguan",
        "hint": "Significa 'en invierno'"
      },
      {
        "type": "match",
        "pairs": [
          [
            "Ur",
            "Agua"
          ],
          [
            "Etxe",
            "Casa"
          ],
          [
            "Lagun",
            "Amigo"
          ],
          [
            "Ogi",
            "Pan"
          ],
          [
            "Txakur",
            "Perro"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Ama",
            "Madre"
          ],
          [
            "Aita",
            "Padre"
          ],
          [
            "Anaia",
            "Hermano"
          ],
          [
            "Katu",
            "Gato"
          ],
          [
            "Zaldi",
            "Caballo"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Gorria",
            "Rojo"
          ],
          [
            "Urdina",
            "Azul"
          ],
          [
            "Berdea",
            "Verde"
          ],
          [
            "Horia",
            "Amarillo"
          ],
          [
            "Zuria",
            "Blanco"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Astelehena",
            "Lunes"
          ],
          [
            "Ostirala",
            "Viernes"
          ],
          [
            "Larunbata",
            "Sábado"
          ],
          [
            "Igandea",
            "Domingo"
          ],
          [
            "Urtarrila",
            "Enero"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Udaberri",
            "Primavera"
          ],
          [
            "Uda",
            "Verano"
          ],
          [
            "Udazken",
            "Otoño"
          ],
          [
            "Negu",
            "Invierno"
          ],
          [
            "Eguraldia",
            "El tiempo (clima)"
          ]
        ]
      }
    ]
  },
  {
    "key": "esaldiak",
    "name": "Eguneroko esaldiak",
    "subtitle": "Frases",
    "icon": "💬",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Me llamo...'?",
        "options": [
          "Nire izena da...",
          "Nongoa zara?",
          "Zer moduz?",
          "Ongi nago"
        ],
        "answer": "Nire izena da..."
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ongi nago'?",
        "options": [
          "Estoy mal",
          "Estoy bien",
          "Tengo hambre",
          "Tengo sueño"
        ],
        "answer": "Estoy bien"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: '¿Nongoa zara?'",
        "answer": "¿De dónde eres?",
        "options": [
          "¿Cómo te llamas?",
          "¿De dónde eres?",
          "¿Cuántos años tienes?",
          "¿Dónde vives?"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Por favor'",
        "answer": "Mesedez",
        "options": [
          "Mesedez",
          "Barkatu",
          "Eskerrik asko",
          "Bai"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Perdón/Disculpa'?",
        "options": [
          "Bai",
          "Ez",
          "Barkatu",
          "Mesedez"
        ],
        "answer": "Barkatu"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ez dut ulertzen'?",
        "options": [
          "No entiendo",
          "No lo sé",
          "No quiero",
          "No puedo"
        ],
        "answer": "No entiendo"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Non dago komuna?'",
        "answer": "¿Dónde está el baño?",
        "options": [
          "¿Dónde está el baño?",
          "¿Qué hora es?",
          "¿Cuánto cuesta?",
          "¿Dónde vives?"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: '¿Cuánto cuesta?'",
        "answer": "Zenbat da?",
        "options": [
          "Zenbat da?",
          "Zer da hau?",
          "Non dago?",
          "Zer moduz?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Sí' y 'No'?",
        "options": [
          "Bai / Ez",
          "Ez / Bai",
          "Bai / Bai",
          "Ez / Ez"
        ],
        "answer": "Bai / Ez"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Laguntzerik al didazu?'",
        "options": [
          "¿Me puedes ayudar?",
          "¿Te puedo ayudar?",
          "¿Dónde está?",
          "¿Qué necesitas?"
        ],
        "answer": "¿Me puedes ayudar?"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Yo soy' (izan, 1ª persona)?",
        "options": [
          "Naiz",
          "Da",
          "Zara",
          "Gara"
        ],
        "answer": "Naiz"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zu zara'",
        "answer": "Tú eres",
        "options": [
          "Tú eres",
          "Él es",
          "Yo soy",
          "Nosotros somos"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Nosotros somos' (izan)?",
        "options": [
          "Gara",
          "Zarete",
          "Dira",
          "Naiz"
        ],
        "answer": "Gara"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Yo tengo' (ukan)",
        "answer": "Nik dut",
        "options": [
          "Nik dut",
          "Nik naiz",
          "Nik dugu",
          "Nik dira"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Etxean nago'?",
        "options": [
          "Estoy en casa",
          "Voy a casa",
          "Vengo de casa",
          "Vivo en casa"
        ],
        "answer": "Estoy en casa"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Bilbotik nator'",
        "answer": "Vengo de Bilbao",
        "options": [
          "Voy a Bilbao",
          "Vengo de Bilbao",
          "Vivo en Bilbao",
          "Soy de Bilbao"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Mañana voy a trabajar'?",
        "options": [
          "Bihar lanera joango naiz",
          "Atzo lanean nengoen",
          "Gaur lanean nago",
          "Lehen lanera joan nintzen"
        ],
        "answer": "Bihar lanera joango naiz"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: '¿Puedes repetir, por favor?'",
        "answer": "Errepika dezakezu, mesedez?",
        "options": [
          "Errepika dezakezu, mesedez?",
          "Ulertzen duzu?",
          "Berriz esan, mesedez?",
          "Entzun al duzu?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Denbora asko daramat hemen'?",
        "options": [
          "Llevo mucho tiempo aquí",
          "Voy a estar poco tiempo",
          "Tengo poco tiempo",
          "El tiempo pasa rápido"
        ],
        "answer": "Llevo mucho tiempo aquí"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zer ordu da?'",
        "answer": "¿Qué hora es?",
        "options": [
          "¿Qué hora es?",
          "¿Qué día es?",
          "¿Cuándo llegas?",
          "¿A qué hora vienes?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Yo sé' (jakin)?",
        "options": [
          "Badakit",
          "Banaiz",
          "Badut",
          "Banoa"
        ],
        "answer": "Badakit"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Nora zoaz?'",
        "answer": "¿A dónde vas?",
        "options": [
          "¿A dónde vas?",
          "¿De dónde vienes?",
          "¿Dónde estás?",
          "¿Cuándo vas?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Estamos andando' (ibili)?",
        "options": [
          "Gabiltza",
          "Gaude",
          "Goaz",
          "Gatoz"
        ],
        "answer": "Gabiltza"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Ellos vienen'",
        "answer": "Haiek datoz",
        "options": [
          "Haiek datoz",
          "Haiek doaz",
          "Haiek daude",
          "Haiek dabiltza"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Creo que tienes razón' (arrazoi)?",
        "options": [
          "Uste dut arrazoi duzula",
          "Uste dut arrazoia dela",
          "Ez dut arrazoirik",
          "Arrazoi naiz"
        ],
        "answer": "Uste dut arrazoi duzula"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Nik uste dut hori ez dela egia'",
        "answer": "Yo creo que eso no es verdad",
        "options": [
          "Yo creo que eso no es verdad",
          "Yo sé que eso es verdad",
          "Tú crees que es mentira",
          "Él dice que es verdad"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Si tuviera tiempo, iría' (baldintza)?",
        "options": [
          "Denbora banu, joango nintzateke",
          "Denbora dut, joango naiz",
          "Denbora banu, joan naiz",
          "Denbora ez badut, ez naiz joango"
        ],
        "answer": "Denbora banu, joango nintzateke"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Aunque llueva, saldremos'",
        "answer": "Euria eginda ere, aterako gara",
        "options": [
          "Euria eginda ere, aterako gara",
          "Euria egiten badu, ez gara aterako",
          "Euririk gabe aterako gara",
          "Euria egingo du, esan didate"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Nahiz eta gaizki egon, lanera joan nintzen'?",
        "options": [
          "Aunque estaba mal, fui a trabajar",
          "Como estaba mal, no fui a trabajar",
          "Si estoy mal, no voy a trabajar",
          "Estaba mal así que me quedé en casa"
        ],
        "answer": "Aunque estaba mal, fui a trabajar"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Espero dut dena ondo ateratzea'",
        "answer": "Espero que todo salga bien",
        "options": [
          "Espero que todo salga bien",
          "Creo que todo saldrá mal",
          "Todo ha salido bien",
          "Quiero que salga todo perfecto"
        ]
      },
      {
        "type": "fill_blank",
        "question": "Nire izena ___ Jon.  (Mi nombre es Jon.)",
        "answer": "da",
        "hint": "Forma del verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Ongi ___, eskerrik asko.  (Estoy bien, gracias.)",
        "answer": "nago",
        "hint": "Forma del verbo egon, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Ez dut ___.  (No entiendo.)",
        "answer": "ulertzen",
        "hint": "Significa 'entendiendo'"
      },
      {
        "type": "fill_blank",
        "question": "___ dago komuna?  (¿Dónde está el baño?)",
        "answer": "Non",
        "hint": "Significa '¿dónde?'"
      },
      {
        "type": "fill_blank",
        "question": "Zenbat ___?  (¿Cuánto cuesta?)",
        "answer": "da",
        "hint": "Forma del verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Laguntzerik al ___?  (¿Me puedes ayudar?)",
        "answer": "didazu",
        "hint": "Forma verbal de 'dar/ayudar', 2ª persona a 1ª"
      },
      {
        "type": "fill_blank",
        "question": "Ni Bilbokoa ___.  (Yo soy de Bilbao.)",
        "answer": "naiz",
        "hint": "Forma del verbo izan, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Zuek Donostiakoak ___.  (Vosotros sois de San Sebastián.)",
        "answer": "zarete",
        "hint": "Forma del verbo izan, 2ª persona plural"
      },
      {
        "type": "fill_blank",
        "question": "Nik liburu bat ___.  (Yo tengo un libro.)",
        "answer": "dut",
        "hint": "Forma del verbo ukan (tener), 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Etxean ___.  (Estoy en casa.)",
        "answer": "nago",
        "hint": "Forma del verbo egon, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Bilbotik ___.  (Vengo de Bilbao.)",
        "answer": "nator",
        "hint": "Forma del verbo etorri, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Bihar lanera ___ naiz.  (Mañana voy a ir a trabajar.)",
        "answer": "joango",
        "hint": "Futuro del verbo joan (ir)"
      },
      {
        "type": "fill_blank",
        "question": "Zer ordu ___?  (¿Qué hora es?)",
        "answer": "da",
        "hint": "Forma del verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Ba___ nora joan behar dudan.  (Sé a dónde tengo que ir.)",
        "answer": "dakit",
        "hint": "Forma del verbo jakin (saber), 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Nora ___?  (¿A dónde vas?)",
        "answer": "zoaz",
        "hint": "Forma del verbo joan, 2ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Haiek gaur ___.  (Ellos vienen hoy.)",
        "answer": "datoz",
        "hint": "Forma del verbo etorri, 3ª persona plural"
      },
      {
        "type": "fill_blank",
        "question": "Uste dut arrazoi ___.  (Creo que tienes razón.)",
        "answer": "duzula",
        "hint": "Forma subordinada de ukan, 2ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Denbora ___, joango nintzateke.  (Si tuviera tiempo, iría.)",
        "answer": "banu",
        "hint": "Forma condicional de ukan"
      },
      {
        "type": "fill_blank",
        "question": "Gehiago ikasi ___ duzu.  (Necesitas estudiar más.)",
        "answer": "behar",
        "hint": "Significa 'necesidad, deber'"
      },
      {
        "type": "fill_blank",
        "question": "Ez ___ iritsi zinela.  (No sabía que habías llegado.)",
        "answer": "nekien",
        "hint": "Pasado del verbo jakin, 1ª persona"
      },
      {
        "type": "match",
        "pairs": [
          [
            "Naiz",
            "Soy / Estoy"
          ],
          [
            "Zara",
            "Eres / Estás"
          ],
          [
            "Da",
            "Es / Está"
          ],
          [
            "Gara",
            "Somos / Estamos"
          ],
          [
            "Dira",
            "Son / Están"
          ]
        ]
      },
      {
        "type": "match",
        "pairs": [
          [
            "Joan",
            "Ir"
          ],
          [
            "Etorri",
            "Venir"
          ],
          [
            "Egon",
            "Estar"
          ],
          [
            "Ukan",
            "Tener"
          ],
          [
            "Jakin",
            "Saber"
          ]
        ]
      }
    ]
  }
];

let state = null;

const defaultState = () => ({
  topicStats: {}
});

function loadState() {
  OLD_STORAGE_KEYS.forEach(k => {
    if (localStorage.getItem(k)) localStorage.removeItem(k);
  });
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { return defaultState(); }
  }
  return defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetProgress() {
  state = defaultState();
  saveState();
  renderHome();
  showScreen('home-screen');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function isVisible(el) {
  return el && el.offsetParent !== null;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandomQuestions(topic) {
  const shuffled = shuffle(topic.questions);
  return shuffled.slice(0, Math.min(QUESTIONS_PER_SESSION, shuffled.length));
}

function renderHome() {
  const list = document.getElementById('units-list');
  list.innerHTML = '';

  TOPICS.forEach(topic => {
    const stats = state.topicStats[topic.key] || { timesPlayed: 0, bestAccuracy: 0 };
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.innerHTML = `
      <div class="unit-icon">${topic.icon}</div>
      <div class="unit-info">
        <h3>${topic.name}</h3>
        <p>${topic.subtitle} · ${topic.questions.length} preguntas en el banco</p>
        ${stats.timesPlayed > 0 ? `<span class="unit-badge">Mejor: ${stats.bestAccuracy}%</span>` : ''}
      </div>
    `;
    card.addEventListener('click', () => startLesson(topic));
    list.appendChild(card);
  });
}

let currentTopic = null;
let currentQuestions = [];
let currentExerciseIndex = 0;
let sessionCorrect = 0;
let sessionTotal = 0;
let selectedOption = null;
let answered = false;
let currentAnswerCorrect = false;

// Estado especifico del ejercicio de emparejar
let matchSelectedLeft = null;
let matchSelectedRight = null;
let matchSolvedCount = 0;
let matchTotalPairs = 0;

function startLesson(topic) {
  currentTopic = topic;
  currentQuestions = pickRandomQuestions(topic);
  currentExerciseIndex = 0;
  sessionCorrect = 0;
  sessionTotal = currentQuestions.length;
  showScreen('lesson-screen');
  document.getElementById('footer-bar').classList.remove('hidden');
  renderExercise();
}

function normalizeAnswer(text) {
  return String(text).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function hideAllExerciseBlocks() {
  document.getElementById('exercise-options').style.display = 'none';
  document.getElementById('fill-input-wrap').style.display = 'none';
  document.getElementById('match-wrap').style.display = 'none';
  document.getElementById('match-progress').style.display = 'none';
}

function renderExercise() {
  answered = false;
  selectedOption = null;
  const ex = currentQuestions[currentExerciseIndex];

  const progressPct = (currentExerciseIndex / currentQuestions.length) * 100;
  document.getElementById('lesson-progress').style.width = progressPct + '%';

  hideAllExerciseBlocks();
  const hintEl = document.getElementById('exercise-hint');
  hintEl.style.display = 'none';
  const footerBar = document.getElementById('footer-bar');
  const actionBtn = document.getElementById('action-btn');

  if (ex.type === 'match') {
    document.getElementById('exercise-question').textContent = 'Empareja cada palabra con su traducción';
    footerBar.classList.add('hidden');
    renderMatchExercise(ex);
    return;
  }

  footerBar.classList.remove('hidden');
  document.getElementById('exercise-question').textContent = ex.question;

  const optionsContainer = document.getElementById('exercise-options');
  const fillWrap = document.getElementById('fill-input-wrap');
  const fillInput = document.getElementById('fill-input');

  optionsContainer.innerHTML = '';
  const isFillBlank = ex.type === 'fill_blank';
  optionsContainer.style.display = isFillBlank ? 'none' : 'flex';
  fillWrap.style.display = isFillBlank ? 'block' : 'none';

  if (isFillBlank) {
    fillInput.value = '';
    fillInput.disabled = false;
    fillInput.className = 'fill-input';
    if (ex.hint) {
      hintEl.textContent = '💡 ' + ex.hint;
      hintEl.style.display = 'block';
    }
    fillInput.oninput = () => {
      document.getElementById('action-btn').classList.toggle('active', fillInput.value.trim().length > 0);
    };
    setTimeout(() => fillInput.focus(), 100);
  } else {
    const opts = shuffle(ex.options);
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectOption(btn, opt));
      optionsContainer.appendChild(btn);
    });
  }

  const feedback = document.getElementById('feedback-banner');
  feedback.className = 'feedback-banner hidden';
  actionBtn.textContent = 'Comprobar';
  actionBtn.className = 'big-btn';
  actionBtn.onclick = checkAnswer;
}

function renderMatchExercise(ex) {
  matchSelectedLeft = null;
  matchSelectedRight = null;
  matchSolvedCount = 0;
  matchTotalPairs = ex.pairs.length;

  const leftItems = shuffle(ex.pairs.map((p, idx) => ({ text: p[0], pairId: idx })));
  const rightItems = shuffle(ex.pairs.map((p, idx) => ({ text: p[1], pairId: idx })));

  const matchWrap = document.getElementById('match-wrap');
  const colLeft = document.getElementById('match-col-left');
  const colRight = document.getElementById('match-col-right');
  const progressEl = document.getElementById('match-progress');

  matchWrap.style.display = 'flex';
  progressEl.style.display = 'block';
  colLeft.innerHTML = '';
  colRight.innerHTML = '';

  leftItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.textContent = item.text;
    div.dataset.pairId = item.pairId;
    div.dataset.side = 'left';
    div.addEventListener('click', () => onMatchItemClick(div, 'left', item.pairId, ex));
    colLeft.appendChild(div);
  });

  rightItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.textContent = item.text;
    div.dataset.pairId = item.pairId;
    div.dataset.side = 'right';
    div.addEventListener('click', () => onMatchItemClick(div, 'right', item.pairId, ex));
    colRight.appendChild(div);
  });

  updateMatchProgress();
}

function updateMatchProgress() {
  document.getElementById('match-progress').textContent = matchSolvedCount + ' / ' + matchTotalPairs + ' parejas encontradas';
}

function onMatchItemClick(el, side, pairId, ex) {
  if (el.classList.contains('matched')) return;

  if (side === 'left') {
    if (matchSelectedLeft) matchSelectedLeft.classList.remove('selected');
    matchSelectedLeft = el;
    el.classList.add('selected');
  } else {
    if (matchSelectedRight) matchSelectedRight.classList.remove('selected');
    matchSelectedRight = el;
    el.classList.add('selected');
  }

  if (matchSelectedLeft && matchSelectedRight) {
    const leftPairId = matchSelectedLeft.dataset.pairId;
    const rightPairId = matchSelectedRight.dataset.pairId;

    if (leftPairId === rightPairId) {
      matchSelectedLeft.classList.remove('selected');
      matchSelectedRight.classList.remove('selected');
      matchSelectedLeft.classList.add('matched');
      matchSelectedRight.classList.add('matched');
      matchSolvedCount += 1;
      updateMatchProgress();
      matchSelectedLeft = null;
      matchSelectedRight = null;

      if (matchSolvedCount >= matchTotalPairs) {
        sessionCorrect += 1;
        setTimeout(() => nextExercise(), 500);
      }
    } else {
      const wrongLeft = matchSelectedLeft;
      const wrongRight = matchSelectedRight;
      wrongLeft.classList.add('wrong-flash');
      wrongRight.classList.add('wrong-flash');
      setTimeout(() => {
        wrongLeft.classList.remove('selected', 'wrong-flash');
        wrongRight.classList.remove('selected', 'wrong-flash');
      }, 400);
      matchSelectedLeft = null;
      matchSelectedRight = null;
    }
  }
}

function selectOption(btn, value) {
  if (answered) return;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOption = value;
  document.getElementById('action-btn').classList.add('active');
}

function checkAnswer() {
  if (answered) {
    nextExercise();
    return;
  }
  const ex = currentQuestions[currentExerciseIndex];
  const fillInput = document.getElementById('fill-input');

  let userRawValue = '';

  if (ex.type === 'fill_blank') {
    userRawValue = fillInput.value;
    const userValue = userRawValue.trim();
    if (userValue.length === 0) return;
    answered = true;
    currentAnswerCorrect = normalizeAnswer(userValue) === normalizeAnswer(ex.answer);
    fillInput.disabled = true;
    fillInput.className = 'fill-input ' + (currentAnswerCorrect ? 'correct' : 'incorrect');
    if (!currentAnswerCorrect) {
      fillInput.value = ex.answer;
    }
  } else {
    if (selectedOption === null) return;
    answered = true;
    currentAnswerCorrect = selectedOption === ex.answer;
    document.querySelectorAll('.option-btn').forEach(b => {
      b.disabled = true;
      if (b.textContent === ex.answer) {
        b.classList.add('correct');
      } else if (b.classList.contains('selected') && !currentAnswerCorrect) {
        b.classList.add('incorrect');
      }
    });
  }

  const feedback = document.getElementById('feedback-banner');
  const actionBtn = document.getElementById('action-btn');

  if (currentAnswerCorrect) {
    sessionCorrect += 1;
    feedback.className = 'feedback-banner correct';
    feedback.innerHTML = '✅ &nbsp;<strong>¡Correcto!</strong>';
    actionBtn.className = 'big-btn active';
  } else {
    feedback.className = 'feedback-banner incorrect';
    if (ex.type === 'fill_blank') {
      feedback.innerHTML = `❌ &nbsp;<strong>Correcta:</strong> "${ex.answer}" &nbsp;<span style="opacity:0.7">(escribiste: "${userRawValue.trim()}")</span>`;
    } else {
      feedback.innerHTML = `❌ &nbsp;<strong>Respuesta correcta:</strong> ${ex.answer}`;
    }
    actionBtn.className = 'big-btn wrong-state active';
    document.getElementById('app').classList.add('shake');
    setTimeout(() => document.getElementById('app').classList.remove('shake'), 400);
  }
  saveState();
  actionBtn.textContent = 'Continuar';
}

function nextExercise() {
  currentExerciseIndex += 1;
  if (currentExerciseIndex >= currentQuestions.length) {
    finishLesson();
  } else {
    renderExercise();
  }
}

function goToHomeFromResult() {
  renderHome();
  showScreen('home-screen');
}

function finishLesson() {
  document.getElementById('lesson-progress').style.width = '100%';
  const accuracy = Math.round((sessionCorrect / sessionTotal) * 100);

  const prevStats = state.topicStats[currentTopic.key] || { timesPlayed: 0, bestAccuracy: 0 };
  state.topicStats[currentTopic.key] = {
    timesPlayed: prevStats.timesPlayed + 1,
    bestAccuracy: Math.max(prevStats.bestAccuracy, accuracy)
  };
  saveState();

  document.getElementById('result-emoji').textContent = accuracy >= 80 ? '🎉' : (accuracy >= 60 ? '👍' : '😅');
  document.getElementById('result-title').textContent = accuracy >= 60 ? '¡Lección completada!' : 'Sigue practicando';
  document.getElementById('result-points').textContent = sessionCorrect + '/' + sessionTotal;
  document.getElementById('result-accuracy').textContent = accuracy + '%';

  document.getElementById('footer-bar').classList.add('hidden');
  showScreen('result-screen');
}

document.addEventListener('DOMContentLoaded', () => {
  state = loadState();
  renderHome();

  document.getElementById('exit-lesson-btn').addEventListener('click', () => {
    document.getElementById('footer-bar').classList.add('hidden');
    renderHome();
    showScreen('home-screen');
  });

  document.getElementById('continue-btn').addEventListener('click', goToHomeFromResult);

  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    const ok = confirm('¿Seguro que quieres reiniciar todo el progreso (mejores marcas por tema)?');
    if (ok) resetProgress();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const continueBtn = document.getElementById('continue-btn');
    const actionBtn = document.getElementById('action-btn');

    if (isVisible(continueBtn)) {
      e.preventDefault();
      continueBtn.click();
      return;
    }

    if (isVisible(actionBtn) && actionBtn.classList.contains('active')) {
      e.preventDefault();
      actionBtn.click();
    }
  });
});
