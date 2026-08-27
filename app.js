// ===== Euskaraz - App de aprendizaje de euskera =====
//
// Ampliacion: se ha pasado de 26 a 66 ejercicios de "build_sentence"
// (construir la frase), anadiendo 40 nuevos (10 por cada uno de los 4
// temas). Se mezcla vocabulario ya conocido con contenido nuevo (comida,
// partes de la casa, profesiones, clima, expresiones de tiempo/frecuencia).

const STORAGE_KEY = 'euskaraz_progress_v6';
const OLD_STORAGE_KEYS = ['euskaraz_progress_v1', 'euskaraz_progress_v2', 'euskaraz_progress_v3', 'euskaraz_progress_v4', 'euskaraz_progress_v5'];
const QUESTIONS_PER_SESSION = 15;

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
        "options": [
          "Buenas tardes",
          "Buenas noches",
          "Buenos días",
          "Hasta luego"
        ],
        "answer": "Buenas tardes"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Gabon'",
        "options": [
          "Buenos días",
          "Buenas noches",
          "Hola",
          "Adiós"
        ],
        "answer": "Buenas noches"
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
        "options": [
          "Gero arte",
          "Bihar arte",
          "Agur",
          "Egun on"
        ],
        "answer": "Gero arte"
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
        "options": [
          "Ez horregatik",
          "Mesedez",
          "Barkatu",
          "Bai"
        ],
        "answer": "Ez horregatik"
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
        "options": [
          "Bien, ¿y tú?",
          "Mal, ¿y tú?",
          "¿Cómo estás?",
          "Muchas gracias"
        ],
        "answer": "Bien, ¿y tú?"
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
        "options": [
          "Arratsalde on guztioi",
          "Egun on guztioi",
          "Gabon guztioi",
          "Kaixo guztioi"
        ],
        "answer": "Arratsalde on guztioi"
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
        "options": [
          "Cuídate",
          "Adiós",
          "Buena suerte",
          "Hasta pronto"
        ],
        "answer": "Cuídate"
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
        "options": [
          "Ongi etorri",
          "Ongi nago",
          "Ongi da",
          "Ongi joan"
        ],
        "answer": "Ongi etorri"
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
        "options": [
          "¡Buena suerte!",
          "¡Feliz cumpleaños!",
          "¡Buen provecho!",
          "¡Enhorabuena!"
        ],
        "answer": "¡Buena suerte!"
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
        "options": [
          "Gracias por venir",
          "Gracias por todo",
          "Bienvenido de nuevo",
          "Hasta la próxima"
        ],
        "answer": "Gracias por venir"
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
        "options": [
          "Plazer bat izan da zu ezagutzea",
          "Atsegin da zu ezagutzea",
          "Ongi etorri",
          "Poztu naiz zurekin"
        ],
        "answer": "Plazer bat izan da zu ezagutzea"
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
        "options": [
          "Muchas gracias de corazón",
          "Muchas gracias por todo",
          "Gracias otra vez",
          "De nada en absoluto"
        ],
        "answer": "Muchas gracias de corazón"
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
        "options": [
          "Zaindu zaitezte denok",
          "Zaindu zaitez ondo",
          "Ongi egon zaitezte",
          "Ondo pasa denok"
        ],
        "answer": "Zaindu zaitezte denok"
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
        "options": [
          "Sed bienvenidos a nuestra casa",
          "Cuidad bien la casa",
          "Volved pronto a casa",
          "Buenas noches en casa"
        ],
        "answer": "Sed bienvenidos a nuestra casa"
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
        "question": "Ez ___!  (¡De nada!)",
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
        "hint": "Significa 'mañana'"
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
        "hint": "Presente de poztu: pozten + naiz"
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
        "hint": "Futuro de 'ikusi' (ver)"
      },
      {
        "type": "fill_blank",
        "question": "___ berandu iritsi izana.  (Siento mucho el retraso.)",
        "answer": "Barkatu",
        "hint": "Significa 'perdón'"
      },
      {
        "type": "fill_blank",
        "question": "Zaindu ___ denok!  (¡Cuídense todos!)",
        "answer": "zaitezte",
        "hint": "Forma plural imperativa"
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
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Buenas tardes a todos",
        "correct_words": [
          "Arratsalde",
          "on",
          "guztioi"
        ],
        "distractor_words": [
          "Egun",
          "gau",
          "Kaixo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Eskerrik asko bihotzez",
        "correct_words": [
          "Muchas",
          "gracias",
          "de",
          "corazón"
        ],
        "distractor_words": [
          "Buenos",
          "días",
          "amigo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Espero verte pronto",
        "correct_words": [
          "Laster",
          "ikusiko",
          "zaitut"
        ],
        "distractor_words": [
          "Gero",
          "etorriko",
          "naiz"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ongi etorri gure etxera",
        "correct_words": [
          "Bienvenido",
          "a",
          "nuestra",
          "casa"
        ],
        "distractor_words": [
          "Hasta",
          "luego",
          "amigo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Hoy hace mucho frío",
        "correct_words": [
          "Gaur",
          "hotz",
          "handia",
          "dago"
        ],
        "distractor_words": [
          "bero",
          "atzo",
          "eguzkia"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Bihar euria egingo du",
        "correct_words": [
          "Mañana",
          "va",
          "a",
          "llover"
        ],
        "distractor_words": [
          "hoy",
          "nevar",
          "hacer sol"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Buenos días, ¿qué tal estás hoy?",
        "correct_words": [
          "Egun",
          "on,",
          "zer",
          "moduz",
          "zaude",
          "gaur?"
        ],
        "distractor_words": [
          "Gabon,",
          "atzo",
          "biharko"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Eskerrik asko, oso pozik nago",
        "correct_words": [
          "Muchas",
          "gracias,",
          "estoy",
          "muy",
          "contento"
        ],
        "distractor_words": [
          "triste",
          "enfadado",
          "cansado"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Perdona, no te he entendido bien",
        "correct_words": [
          "Barkatu,",
          "ez",
          "zaitut",
          "ondo",
          "ulertu"
        ],
        "distractor_words": [
          "gaizki",
          "behin",
          "inoiz"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ondo etorri berriro gure herrira",
        "correct_words": [
          "Bienvenido",
          "de",
          "nuevo",
          "a",
          "nuestro",
          "pueblo"
        ],
        "distractor_words": [
          "ciudad",
          "casa",
          "barrio"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Que tengas mucha suerte en el examen",
        "correct_words": [
          "Zorte",
          "handia",
          "izan",
          "dezazula",
          "azterketan"
        ],
        "distractor_words": [
          "gutxi",
          "lanean",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Laster arte, hurrengo astean ikusiko dugu elkar",
        "correct_words": [
          "Hasta",
          "pronto,",
          "nos",
          "veremos",
          "la",
          "semana",
          "próxima"
        ],
        "distractor_words": [
          "mañana",
          "ayer",
          "año"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Gracias por invitarme a tu fiesta",
        "correct_words": [
          "Eskerrik",
          "asko",
          "zure",
          "festara",
          "gonbidatzeagatik"
        ],
        "distractor_words": [
          "etxera",
          "lanera",
          "bidaiara"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Kaixo, aspaldiko partez!",
        "correct_words": [
          "Hola,",
          "cuánto",
          "tiempo",
          "sin",
          "verte"
        ],
        "distractor_words": [
          "adiós",
          "buenas",
          "noches"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Cuídate mucho durante el viaje",
        "correct_words": [
          "Zaindu",
          "ondo",
          "zeure",
          "burua",
          "bidaian"
        ],
        "distractor_words": [
          "etxean",
          "lanean",
          "gaur"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ongi pasa oporretan, laster arte",
        "correct_words": [
          "Pásalo",
          "bien",
          "en",
          "las",
          "vacaciones,",
          "hasta",
          "pronto"
        ],
        "distractor_words": [
          "trabajo",
          "casa",
          "escuela"
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
        "options": [
          "Dos",
          "Tres",
          "Cuatro",
          "Cinco"
        ],
        "answer": "Tres"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zazpi'",
        "options": [
          "Seis",
          "Siete",
          "Ocho",
          "Nueve"
        ],
        "answer": "Siete"
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
        "options": [
          "Zazpi",
          "Zortzi",
          "Bederatzi",
          "Sei"
        ],
        "answer": "Zortzi"
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
        "options": [
          "Hiru",
          "Lau",
          "Bost",
          "Bi"
        ],
        "answer": "Lau"
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
        "options": [
          "Once",
          "Doce",
          "Trece",
          "Catorce"
        ],
        "answer": "Doce"
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
        "options": [
          "Treinta",
          "Cuarenta",
          "Cincuenta",
          "Sesenta"
        ],
        "answer": "Cuarenta"
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
        "question": "Traduce al euskera: 'veintidós'",
        "options": [
          "Hogeita bi",
          "Hogeita hamar",
          "Hamabi",
          "Berrogeita bi"
        ],
        "answer": "Hogeita bi"
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
        "options": [
          "Cien",
          "Quinientos",
          "Mil",
          "Diez mil"
        ],
        "answer": "Mil"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'primero'?",
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
        "question": "Traduce al euskera: 'segundo'",
        "options": [
          "Bigarrena",
          "Hirugarrena",
          "Lehena",
          "Laugarrena"
        ],
        "answer": "Bigarrena"
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
        "options": [
          "Sesenta",
          "Setenta",
          "Ochenta",
          "Noventa"
        ],
        "answer": "Setenta"
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
        "options": [
          "Dos mil veintiséis",
          "Dos mil dieciséis",
          "Doscientos veintiséis",
          "Veinte mil seis"
        ],
        "answer": "Dos mil veintiséis"
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
        "question": "Traduce al euskera: 'último'",
        "options": [
          "Azkena",
          "Lehena",
          "Erdikoa",
          "Hurrengoa"
        ],
        "answer": "Azkena"
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
        "options": [
          "Tres cuartos",
          "Un tercio",
          "Media docena",
          "Tres décimas"
        ],
        "answer": "Tres cuartos"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'décimo'?",
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
        "options": [
          "Bederatziehun eta laurogeita hemeretzi",
          "Bederatzi mila eta laurogeita hemeretzi",
          "Bederatziehun eta hirurogeita hemeretzi",
          "Zortziehun eta laurogeita hemeretzi"
        ],
        "answer": "Bederatziehun eta laurogeita hemeretzi"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Docena' en euskera?",
        "options": [
          "Dozena",
          "Herena",
          "Talde bat",
          "Sail bat"
        ],
        "answer": "Dozena"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ehuneko hogeiko deskontua'",
        "options": [
          "Descuento del veinte por ciento",
          "Cien de veinte",
          "Veinte de cien",
          "Descuento del cien por cien"
        ],
        "answer": "Descuento del veinte por ciento"
      },
      {
        "type": "fill_blank",
        "question": "Lagun ___ (1) dut hemen.  (Tengo un amigo aquí.)",
        "answer": "bat",
        "hint": "'bat' va DETRÁS del sustantivo"
      },
      {
        "type": "fill_blank",
        "question": "___ (5) ordu daramat lanean.  (Llevo 5 horas trabajando.)",
        "answer": "Bost",
        "hint": "El número 5"
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
        "question": "___ (80) liburu ditu liburutegian.  (Tiene 80 libros.)",
        "answer": "Laurogei",
        "hint": "El número 80"
      },
      {
        "type": "fill_blank",
        "question": "___ mailakoa da.  (Es de primer nivel.)",
        "answer": "Lehen",
        "hint": "Ordinal 'primero'"
      },
      {
        "type": "fill_blank",
        "question": "Hori da ___ aldiz esaten dudana.  (Es la segunda vez.)",
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
        "hint": "La mitad (con artículo)"
      },
      {
        "type": "fill_blank",
        "question": "Ehuneko ___ (20) deskontua dago.  (Hay un descuento del 20%.)",
        "answer": "hogeiko",
        "hint": "Con -ko: modifica a 'deskontua'"
      },
      {
        "type": "fill_blank",
        "question": "Pertsona ___ (1000000) bizi dira hirian.  (Un millón viven en la ciudad.)",
        "answer": "milioi bat",
        "hint": "Un millón"
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
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Tengo veinte años",
        "correct_words": [
          "Hogei",
          "urte",
          "ditut"
        ],
        "distractor_words": [
          "Hamar",
          "hilabete",
          "naiz"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ehuneko hogeiko deskontua",
        "correct_words": [
          "Descuento",
          "del",
          "veinte",
          "por",
          "ciento"
        ],
        "distractor_words": [
          "Diez",
          "euros",
          "gratis"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "El abuelo tiene sesenta años",
        "correct_words": [
          "Aitonak",
          "hirurogei",
          "urte",
          "ditu"
        ],
        "distractor_words": [
          "Amonak",
          "berrogei",
          "hamar"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Tartaren erdia jan dut",
        "correct_words": [
          "Me",
          "he",
          "comido",
          "la",
          "mitad",
          "de",
          "la",
          "tarta"
        ],
        "distractor_words": [
          "un",
          "cuarto",
          "entero"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Compré cinco manzanas y dos peras",
        "correct_words": [
          "Bost",
          "sagar",
          "eta",
          "bi",
          "udare",
          "erosi",
          "nituen"
        ],
        "distractor_words": [
          "hiru",
          "laranja",
          "hamar"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Sukaldean lau aulki eta mahai bat daude",
        "correct_words": [
          "En",
          "la",
          "cocina",
          "hay",
          "cuatro",
          "sillas",
          "y",
          "una",
          "mesa"
        ],
        "distractor_words": [
          "tres",
          "sofá",
          "dos"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Necesito cien euros para el viaje",
        "correct_words": [
          "Ehun",
          "euro",
          "behar",
          "ditut",
          "bidaiarako"
        ],
        "distractor_words": [
          "Berrehun",
          "hamar",
          "astea"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Nire arrebak hogeita hamar urte ditu",
        "correct_words": [
          "Mi",
          "hermana",
          "tiene",
          "treinta",
          "años"
        ],
        "distractor_words": [
          "hermano",
          "veinte",
          "cuarenta"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "El tren llega a las nueve de la mañana",
        "correct_words": [
          "Trena",
          "goizeko",
          "bederatzietan",
          "iristen",
          "da"
        ],
        "distractor_words": [
          "hamarretan",
          "gaueko",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Mila pertsona baino gehiago zeuden kalean",
        "correct_words": [
          "Había",
          "más",
          "de",
          "mil",
          "personas",
          "en",
          "la",
          "calle"
        ],
        "distractor_words": [
          "cien",
          "plaza",
          "ayer"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Es la primera vez que visito este pueblo",
        "correct_words": [
          "Lehen",
          "aldiz",
          "bisitatzen",
          "dut",
          "herri",
          "hau"
        ],
        "distractor_words": [
          "bigarren",
          "hirugarren",
          "hiria"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Bosgarren solairuan bizi naiz",
        "correct_words": [
          "Vivo",
          "en",
          "el",
          "quinto",
          "piso"
        ],
        "distractor_words": [
          "cuarto",
          "sexto",
          "segundo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Quedan quince minutos para que empiece la película",
        "correct_words": [
          "Hamabost",
          "minutu",
          "falta",
          "dira",
          "filma",
          "hasteko"
        ],
        "distractor_words": [
          "Hogei",
          "ordu",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Etxe honek berrogei urte ditu",
        "correct_words": [
          "Esta",
          "casa",
          "tiene",
          "cuarenta",
          "años"
        ],
        "distractor_words": [
          "treinta",
          "cincuenta",
          "edificio"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "He comprado ocho huevos y un litro de leche",
        "correct_words": [
          "Zortzi",
          "arrautza",
          "eta",
          "esne",
          "litro",
          "bat",
          "erosi",
          "ditut"
        ],
        "distractor_words": [
          "hamar",
          "ogia",
          "bi"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ehuneko hamar da igotze prezioa",
        "correct_words": [
          "El",
          "aumento",
          "de",
          "precio",
          "es",
          "del",
          "diez",
          "por",
          "ciento"
        ],
        "distractor_words": [
          "veinte",
          "descuento",
          "cincuenta"
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
        "options": [
          "Amigo",
          "Familia",
          "Vecino",
          "Hermano"
        ],
        "answer": "Amigo"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'pan'",
        "options": [
          "Ogi",
          "Ur",
          "Esne",
          "Sagar"
        ],
        "answer": "Ogi"
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
        "options": [
          "Río",
          "Mar",
          "Montaña",
          "Bosque"
        ],
        "answer": "Montaña"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'libro'",
        "options": [
          "Liburu",
          "Mahai",
          "Aulki",
          "Leiho"
        ],
        "answer": "Liburu"
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
        "options": [
          "Pera",
          "Manzana",
          "Naranja",
          "Uva"
        ],
        "answer": "Manzana"
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
        "options": [
          "Padre",
          "Hermano",
          "Abuelo",
          "Tío"
        ],
        "answer": "Padre"
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
        "options": [
          "Gorria",
          "Urdina",
          "Horia",
          "Berdea"
        ],
        "answer": "Gorria"
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
        "options": [
          "Lunes",
          "Martes",
          "Miércoles",
          "Domingo"
        ],
        "answer": "Lunes"
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
        "options": [
          "Urtarrila",
          "Otsaila",
          "Martxoa",
          "Abendua"
        ],
        "answer": "Urtarrila"
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
        "options": [
          "Noviembre",
          "Diciembre",
          "Octubre",
          "Enero"
        ],
        "answer": "Diciembre"
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
        "options": [
          "Vaca",
          "Caballo",
          "Oveja",
          "Cerdo"
        ],
        "answer": "Caballo"
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
        "options": [
          "Zapatak",
          "Prakak",
          "Jakak",
          "Galtzerdiak"
        ],
        "answer": "Zapatak"
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
        "options": [
          "Barco",
          "Avión",
          "Tren",
          "Coche"
        ],
        "answer": "Avión"
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
        "options": [
          "Negu",
          "Uda",
          "Udazken",
          "Udaberri"
        ],
        "answer": "Negu"
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
        "options": [
          "El tiempo (clima)",
          "El día",
          "La estación",
          "El calendario"
        ],
        "answer": "El tiempo (clima)"
      },
      {
        "type": "fill_blank",
        "question": "___ edan behar dut, egarri naiz.  (Necesito beber agua.)",
        "answer": "Ura",
        "hint": "'agua' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "Gure ___ handia da.  (Nuestra casa es grande.)",
        "answer": "etxea",
        "hint": "'casa' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ Bilbon bizi da.  (Mi amigo vive en Bilbao.)",
        "answer": "laguna",
        "hint": "'amigo' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "Goizean ___ jaten dut.  (Por la mañana como pan.)",
        "answer": "ogia",
        "hint": "'pan' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ oso alaia da.  (Mi perro es muy alegre.)",
        "answer": "txakurra",
        "hint": "'perro' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ oso beroa dago gaur.  (El sol está muy fuerte hoy.)",
        "answer": "Eguzkia",
        "hint": "'sol' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ handia dago herriaren ondoan.  (Hay una montaña grande.)",
        "answer": "Mendi",
        "hint": "'montaña' sin artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ bat irakurtzen dut gauero.  (Leo un libro todas las noches.)",
        "answer": "Liburu",
        "hint": "'libro' sin artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ gaineko sagarra hartu dut.  (He cogido la manzana de la mesa.)",
        "answer": "Mahai",
        "hint": "'mesa' sin artículo"
      },
      {
        "type": "fill_blank",
        "question": "Ene ___ Bilbon bizi da.  (Mi madre vive en Bilbao.)",
        "answer": "ama",
        "hint": "'madre' sin artículo"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ medikua da.  (Mi padre es médico.)",
        "answer": "aita",
        "hint": "'padre' sin artículo"
      },
      {
        "type": "fill_blank",
        "question": "Nire ___ berdea da.  (Mi coche es verde.)",
        "answer": "autoa",
        "hint": "'coche' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "Zeruaren kolorea ___ da.  (El color del cielo es azul.)",
        "answer": "urdina",
        "hint": "'azul' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ da gaur.  (Hoy es lunes.)",
        "answer": "Astelehena",
        "hint": "'lunes' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ joango gara zinemara.  (El viernes iremos al cine.)",
        "answer": "Ostiralean",
        "hint": "'el viernes'"
      },
      {
        "type": "fill_blank",
        "question": "___ hasten da urtea.  (El año comienza en enero.)",
        "answer": "Urtarrilean",
        "hint": "'en enero'"
      },
      {
        "type": "fill_blank",
        "question": "Nire autoaren kolorea ___ da.  (El color de mi coche es verde.)",
        "answer": "berdea",
        "hint": "'verde' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ maite dut, oso alaia da.  (Me gusta el gato.)",
        "answer": "Katua",
        "hint": "'gato' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ hartu dugu Madrilera joateko.  (Hemos cogido el avión.)",
        "answer": "Hegazkina",
        "hint": "'avión' con artículo"
      },
      {
        "type": "fill_blank",
        "question": "___ loreak ateratzen dira.  (En primavera salen las flores.)",
        "answer": "Udaberrian",
        "hint": "'en primavera'"
      },
      {
        "type": "fill_blank",
        "question": "___ elurra egiten du askotan.  (En invierno nieva a menudo.)",
        "answer": "Neguan",
        "hint": "'en invierno'"
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
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Mi perro es muy alegre",
        "correct_words": [
          "Nire",
          "txakurra",
          "oso",
          "alaia",
          "da"
        ],
        "distractor_words": [
          "katua",
          "triste",
          "handia"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Gure etxea handia da",
        "correct_words": [
          "Nuestra",
          "casa",
          "es",
          "grande"
        ],
        "distractor_words": [
          "pequeña",
          "bonita",
          "vieja"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "El sol está muy fuerte hoy",
        "correct_words": [
          "Eguzkia",
          "oso",
          "beroa",
          "dago",
          "gaur"
        ],
        "distractor_words": [
          "Hotza",
          "atzo",
          "hodeitsua"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Neguan elurra egiten du askotan",
        "correct_words": [
          "En",
          "invierno",
          "nieva",
          "a",
          "menudo"
        ],
        "distractor_words": [
          "verano",
          "llueve",
          "nunca"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "En la cocina hay pan y agua",
        "correct_words": [
          "Sukaldean",
          "ogia",
          "eta",
          "ura",
          "daude"
        ],
        "distractor_words": [
          "sagarra",
          "esnea",
          "mahaia"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Nire logela txikia da baina polita",
        "correct_words": [
          "Mi",
          "habitación",
          "es",
          "pequeña",
          "pero",
          "bonita"
        ],
        "distractor_words": [
          "grande",
          "fea",
          "cocina"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Hoy hace sol pero hace frío",
        "correct_words": [
          "Gaur",
          "eguzkia",
          "dago",
          "baina",
          "hotz",
          "egiten",
          "du"
        ],
        "distractor_words": [
          "euria",
          "bero",
          "hodeitsua"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Sukaldeko leihotik mendia ikusten dut",
        "correct_words": [
          "Desde",
          "la",
          "ventana",
          "de",
          "la",
          "cocina",
          "veo",
          "la",
          "montaña"
        ],
        "distractor_words": [
          "puerta",
          "salón",
          "mar"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "El baño está al lado del dormitorio",
        "correct_words": [
          "Bainugela",
          "logelaren",
          "ondoan",
          "dago"
        ],
        "distractor_words": [
          "sukaldearen",
          "egongelaren",
          "urrun"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Nire lagunak zaldi bat eta bi txakur ditu",
        "correct_words": [
          "Mi",
          "amigo",
          "tiene",
          "un",
          "caballo",
          "y",
          "dos",
          "perros"
        ],
        "distractor_words": [
          "gato",
          "tres",
          "vaca"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Compramos verduras y fruta en el mercado",
        "correct_words": [
          "Barazkiak",
          "eta",
          "fruta",
          "erosi",
          "genituen",
          "merkatuan"
        ],
        "distractor_words": [
          "ogia",
          "haragia",
          "dendan"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Udan bero handia egiten du kostaldean",
        "correct_words": [
          "En",
          "verano",
          "hace",
          "mucho",
          "calor",
          "en",
          "la",
          "costa"
        ],
        "distractor_words": [
          "invierno",
          "frío",
          "montaña"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "El salón tiene un sofá azul y una televisión",
        "correct_words": [
          "Egongelak",
          "sofa",
          "urdin",
          "bat",
          "eta",
          "telebista",
          "bat",
          "ditu"
        ],
        "distractor_words": [
          "gorria",
          "aulki",
          "mahai"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Nire arreba irakaslea da eskola batean",
        "correct_words": [
          "Mi",
          "hermana",
          "es",
          "profesora",
          "en",
          "una",
          "escuela"
        ],
        "distractor_words": [
          "médica",
          "hospital",
          "tienda"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "En otoño las hojas de los árboles caen",
        "correct_words": [
          "Udazkenean",
          "zuhaitzen",
          "hostoak",
          "erortzen",
          "dira"
        ],
        "distractor_words": [
          "Udan",
          "loreak",
          "hazten"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Gaur haizea handia dago kalean",
        "correct_words": [
          "Hoy",
          "hace",
          "mucho",
          "viento",
          "en",
          "la",
          "calle"
        ],
        "distractor_words": [
          "frío",
          "calor",
          "niebla"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Mi abuela cocina un pastel de manzana",
        "correct_words": [
          "Nire",
          "amonak",
          "sagar",
          "tarta",
          "bat",
          "prestatzen",
          "du"
        ],
        "distractor_words": [
          "udare",
          "ogi",
          "aitak"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ostegunean euria egingo du eta ostiralean eguzkia",
        "correct_words": [
          "El",
          "jueves",
          "lloverá",
          "y",
          "el",
          "viernes",
          "hará",
          "sol"
        ],
        "distractor_words": [
          "nevará",
          "martes",
          "viento"
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
        "options": [
          "¿Cómo te llamas?",
          "¿De dónde eres?",
          "¿Cuántos años tienes?",
          "¿Dónde vives?"
        ],
        "answer": "¿De dónde eres?"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Por favor'",
        "options": [
          "Mesedez",
          "Barkatu",
          "Eskerrik asko",
          "Bai"
        ],
        "answer": "Mesedez"
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
        "options": [
          "¿Dónde está el baño?",
          "¿Qué hora es?",
          "¿Cuánto cuesta?",
          "¿Dónde vives?"
        ],
        "answer": "¿Dónde está el baño?"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: '¿Cuánto cuesta?'",
        "options": [
          "Zenbat da?",
          "Zer da hau?",
          "Non dago?",
          "Zer moduz?"
        ],
        "answer": "Zenbat da?"
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
        "question": "¿Cómo se dice 'Yo soy'?",
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
        "options": [
          "Tú eres",
          "Él es",
          "Yo soy",
          "Nosotros somos"
        ],
        "answer": "Tú eres"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Nosotros somos'?",
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
        "question": "Traduce al euskera: 'Yo tengo'",
        "options": [
          "Nik dut",
          "Nik naiz",
          "Nik dugu",
          "Nik dira"
        ],
        "answer": "Nik dut"
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
        "options": [
          "Voy a Bilbao",
          "Vengo de Bilbao",
          "Vivo en Bilbao",
          "Soy de Bilbao"
        ],
        "answer": "Vengo de Bilbao"
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
        "options": [
          "Errepika dezakezu, mesedez?",
          "Ulertzen duzu?",
          "Berriz esan, mesedez?",
          "Entzun al duzu?"
        ],
        "answer": "Errepika dezakezu, mesedez?"
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
        "options": [
          "¿Qué hora es?",
          "¿Qué día es?",
          "¿Cuándo llegas?",
          "¿A qué hora vienes?"
        ],
        "answer": "¿Qué hora es?"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Yo sé'?",
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
        "options": [
          "¿A dónde vas?",
          "¿De dónde vienes?",
          "¿Dónde estás?",
          "¿Cuándo vas?"
        ],
        "answer": "¿A dónde vas?"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Estamos andando'?",
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
        "options": [
          "Haiek datoz",
          "Haiek doaz",
          "Haiek daude",
          "Haiek dabiltza"
        ],
        "answer": "Haiek datoz"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Creo que tienes razón'?",
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
        "options": [
          "Yo creo que eso no es verdad",
          "Yo sé que eso es verdad",
          "Tú crees que es mentira",
          "Él dice que es verdad"
        ],
        "answer": "Yo creo que eso no es verdad"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Si tuviera tiempo, iría'?",
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
        "options": [
          "Euria eginda ere, aterako gara",
          "Euria egiten badu, ez gara aterako",
          "Euririk gabe aterako gara",
          "Euria egingo du, esan didate"
        ],
        "answer": "Euria eginda ere, aterako gara"
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
        "options": [
          "Espero que todo salga bien",
          "Creo que todo saldrá mal",
          "Todo ha salido bien",
          "Quiero que salga todo perfecto"
        ],
        "answer": "Espero que todo salga bien"
      },
      {
        "type": "fill_blank",
        "question": "Nire izena ___ Jon.  (Mi nombre es Jon.)",
        "answer": "da",
        "hint": "Verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Ongi ___, eskerrik asko.  (Estoy bien, gracias.)",
        "answer": "nago",
        "hint": "Verbo egon, 1ª persona"
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
        "hint": "Verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Laguntzerik al ___?  (¿Me puedes ayudar?)",
        "answer": "didazu",
        "hint": "Forma de 'dar/ayudar'"
      },
      {
        "type": "fill_blank",
        "question": "Ni Bilbokoa ___.  (Yo soy de Bilbao.)",
        "answer": "naiz",
        "hint": "Verbo izan, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Zuek Donostiakoak ___.  (Vosotros sois de San Sebastián.)",
        "answer": "zarete",
        "hint": "Verbo izan, 2ª plural"
      },
      {
        "type": "fill_blank",
        "question": "Nik liburu bat ___.  (Yo tengo un libro.)",
        "answer": "dut",
        "hint": "Verbo ukan, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Etxean ___.  (Estoy en casa.)",
        "answer": "nago",
        "hint": "Verbo egon, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Bilbotik ___.  (Vengo de Bilbao.)",
        "answer": "nator",
        "hint": "Verbo etorri, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Bihar lanera ___ naiz.  (Mañana voy a ir a trabajar.)",
        "answer": "joango",
        "hint": "Futuro de joan"
      },
      {
        "type": "fill_blank",
        "question": "Zer ordu ___?  (¿Qué hora es?)",
        "answer": "da",
        "hint": "Verbo izan, 3ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Ba___ nora joan behar dudan.  (Sé a dónde tengo que ir.)",
        "answer": "dakit",
        "hint": "Verbo jakin, 1ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Nora ___?  (¿A dónde vas?)",
        "answer": "zoaz",
        "hint": "Verbo joan, 2ª persona"
      },
      {
        "type": "fill_blank",
        "question": "Haiek gaur ___.  (Ellos vienen hoy.)",
        "answer": "datoz",
        "hint": "Verbo etorri, 3ª plural"
      },
      {
        "type": "fill_blank",
        "question": "Uste dut arrazoi ___.  (Creo que tienes razón.)",
        "answer": "duzula",
        "hint": "Forma subordinada de ukan"
      },
      {
        "type": "fill_blank",
        "question": "Denbora ___, joango nintzateke.  (Si tuviera tiempo, iría.)",
        "answer": "banu",
        "hint": "Condicional de ukan"
      },
      {
        "type": "fill_blank",
        "question": "Gehiago ikasi ___ duzu.  (Necesitas estudiar más.)",
        "answer": "behar",
        "hint": "Significa 'necesidad'"
      },
      {
        "type": "fill_blank",
        "question": "Ez ___ iritsi zinela.  (No sabía que habías llegado.)",
        "answer": "nekien",
        "hint": "Pasado de jakin"
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
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Vengo de Bilbao",
        "correct_words": [
          "Bilbotik",
          "nator"
        ],
        "distractor_words": [
          "noa",
          "naiz",
          "Donostiatik"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Denbora banu, joango nintzateke",
        "correct_words": [
          "Si",
          "tuviera",
          "tiempo,",
          "iría"
        ],
        "distractor_words": [
          "vendría",
          "quisiera",
          "podría"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Necesitas estudiar más",
        "correct_words": [
          "Gehiago",
          "ikasi",
          "behar",
          "duzu"
        ],
        "distractor_words": [
          "Gutxiago",
          "lan",
          "dut"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ez nekien iritsi zinela",
        "correct_words": [
          "No",
          "sabía",
          "que",
          "habías",
          "llegado"
        ],
        "distractor_words": [
          "creía",
          "vendrías",
          "estabas"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Trabajo en una oficina desde hace dos años",
        "correct_words": [
          "Bi",
          "urte",
          "daramat",
          "bulego",
          "batean",
          "lanean"
        ],
        "distractor_words": [
          "hiru",
          "etxean",
          "dendan"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Neguan hotza egiten du eta udan beroa",
        "correct_words": [
          "En",
          "invierno",
          "hace",
          "frío",
          "y",
          "en",
          "verano",
          "calor"
        ],
        "distractor_words": [
          "otoño",
          "viento",
          "primavera"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "No sé si voy a poder venir mañana",
        "correct_words": [
          "Ez",
          "dakit",
          "biharko",
          "etorri",
          "ahal",
          "izango",
          "dudan"
        ],
        "distractor_words": [
          "gaur",
          "joan",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Uste dut hobe dela orain hastea",
        "correct_words": [
          "Creo",
          "que",
          "es",
          "mejor",
          "empezar",
          "ahora"
        ],
        "distractor_words": [
          "terminar",
          "luego",
          "nunca"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Aunque esté cansado, iré a la reunión",
        "correct_words": [
          "Nekatuta",
          "egon",
          "arren,",
          "bilerara",
          "joango",
          "naiz"
        ],
        "distractor_words": [
          "pozik",
          "etxera",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Zenbat denbora daramazu euskara ikasten?",
        "correct_words": [
          "¿Cuánto",
          "tiempo",
          "llevas",
          "aprendiendo",
          "euskera?"
        ],
        "distractor_words": [
          "trabajando",
          "viviendo",
          "estudiando inglés"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Me gustaría saber cómo funciona esto",
        "correct_words": [
          "Nahiko",
          "nuke",
          "hau",
          "nola",
          "funtzionatzen",
          "duen",
          "jakin"
        ],
        "distractor_words": [
          "Nahi",
          "dut",
          "atzo"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Espero ez izatea berandu iristea",
        "correct_words": [
          "Espero",
          "no",
          "llegar",
          "tarde"
        ],
        "distractor_words": [
          "pronto",
          "hoy",
          "nunca"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Es importante que llegues a tiempo",
        "correct_words": [
          "Garrantzitsua",
          "da",
          "garaiz",
          "iristea"
        ],
        "distractor_words": [
          "Ez",
          "beharrezkoa",
          "gaur"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Ez dut inoiz hori bezalako zerbait ikusi",
        "correct_words": [
          "Nunca",
          "he",
          "visto",
          "algo",
          "como",
          "eso"
        ],
        "distractor_words": [
          "siempre",
          "alguien",
          "aquí"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "es_to_eu",
        "prompt": "Si necesitas ayuda, dímelo sin problema",
        "correct_words": [
          "Laguntza",
          "behar",
          "baduzu,",
          "esan",
          "iezadazu",
          "arazorik",
          "gabe"
        ],
        "distractor_words": [
          "Nahi",
          "izanez",
          "inoiz"
        ]
      },
      {
        "type": "build_sentence",
        "direction": "eu_to_es",
        "prompt": "Denok elkarrekin ikasiko dugu euskara hobeto",
        "correct_words": [
          "Todos",
          "juntos",
          "aprenderemos",
          "euskera",
          "mejor"
        ],
        "distractor_words": [
          "separados",
          "peor",
          "rápido"
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
        <p>${topic.subtitle}</p>
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

let matchSelectedLeft = null;
let matchSelectedRight = null;
let matchSolvedCount = 0;
let matchTotalPairs = 0;

let buildBankWords = [];
let buildAnswerWords = [];

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
  document.getElementById('build-sentence-wrap').style.display = 'none';
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

  if (ex.type === 'build_sentence') {
    footerBar.classList.remove('hidden');
    const label = ex.direction === 'es_to_eu' ? 'Traduce al euskera:' : 'Traduce al español:';
    document.getElementById('exercise-question').textContent = label + ' "' + ex.prompt + '"';
    renderBuildSentenceExercise(ex);
    actionBtn.textContent = 'Comprobar';
    actionBtn.className = 'big-btn';
    actionBtn.onclick = checkAnswer;
    document.getElementById('feedback-banner').className = 'feedback-banner hidden';
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

  document.getElementById('feedback-banner').className = 'feedback-banner hidden';
  actionBtn.textContent = 'Comprobar';
  actionBtn.className = 'big-btn';
  actionBtn.onclick = checkAnswer;
}

function renderBuildSentenceExercise(ex) {
  const wrap = document.getElementById('build-sentence-wrap');
  const answerArea = document.getElementById('build-answer-area');
  const correctAnswerEl = document.getElementById('build-correct-answer');
  wrap.style.display = 'block';
  answerArea.className = 'build-answer-area';
  correctAnswerEl.style.display = 'none';
  correctAnswerEl.textContent = '';
  const allWords = shuffle([...ex.correct_words, ...ex.distractor_words]);
  buildBankWords = allWords.map(text => ({ text, used: false }));
  buildAnswerWords = [];
  renderBuildUI();
  document.getElementById('action-btn').classList.remove('active');
}

function renderBuildUI() {
  const answerArea = document.getElementById('build-answer-area');
  const bank = document.getElementById('build-bank');
  answerArea.innerHTML = '';
  buildAnswerWords.forEach(bankIdx => {
    const chip = document.createElement('span');
    chip.className = 'build-word-chip';
    chip.textContent = buildBankWords[bankIdx].text;
    chip.addEventListener('click', () => onAnswerChipClick(bankIdx));
    answerArea.appendChild(chip);
  });
  bank.innerHTML = '';
  buildBankWords.forEach((word, idx) => {
    const chip = document.createElement('span');
    chip.className = 'build-word-chip' + (word.used ? ' used' : '');
    chip.textContent = word.text;
    chip.addEventListener('click', () => onBankChipClick(idx));
    bank.appendChild(chip);
  });
  document.getElementById('action-btn').classList.toggle('active', buildAnswerWords.length > 0);
}

function onBankChipClick(idx) {
  if (answered) return;
  if (buildBankWords[idx].used) return;
  buildBankWords[idx].used = true;
  buildAnswerWords.push(idx);
  renderBuildUI();
}

function onAnswerChipClick(bankIdx) {
  if (answered) return;
  buildBankWords[bankIdx].used = false;
  buildAnswerWords = buildAnswerWords.filter(i => i !== bankIdx);
  renderBuildUI();
}

function selectOption(btn, value) {
  if (answered) return;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOption = value;
  document.getElementById('action-btn').classList.add('active');
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
    div.addEventListener('click', () => onMatchItemClick(div, 'left', item.pairId));
    colLeft.appendChild(div);
  });
  rightItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'match-item';
    div.textContent = item.text;
    div.dataset.pairId = item.pairId;
    div.addEventListener('click', () => onMatchItemClick(div, 'right', item.pairId));
    colRight.appendChild(div);
  });
  updateMatchProgress();
}

function updateMatchProgress() {
  document.getElementById('match-progress').textContent = matchSolvedCount + ' / ' + matchTotalPairs + ' parejas encontradas';
}

function onMatchItemClick(el, side, pairId) {
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

function checkAnswer() {
  if (answered) {
    nextExercise();
    return;
  }
  const ex = currentQuestions[currentExerciseIndex];
  const fillInput = document.getElementById('fill-input');
  let userRawValue = '';

  if (ex.type === 'build_sentence') {
    if (buildAnswerWords.length === 0) return;
    answered = true;
    const userSentence = buildAnswerWords.map(idx => buildBankWords[idx].text);
    currentAnswerCorrect = userSentence.length === ex.correct_words.length &&
      userSentence.every((w, i) => normalizeAnswer(w) === normalizeAnswer(ex.correct_words[i]));
    const answerArea = document.getElementById('build-answer-area');
    answerArea.classList.add(currentAnswerCorrect ? 'correct' : 'incorrect');
    document.querySelectorAll('#build-bank .build-word-chip, #build-answer-area .build-word-chip').forEach(chip => {
      chip.style.pointerEvents = 'none';
    });
    if (!currentAnswerCorrect) {
      const correctAnswerEl = document.getElementById('build-correct-answer');
      correctAnswerEl.textContent = 'Respuesta correcta: ' + ex.correct_words.join(' ');
      correctAnswerEl.style.display = 'block';
    }
  } else if (ex.type === 'fill_blank') {
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
    } else if (ex.type === 'build_sentence') {
      feedback.innerHTML = '❌ &nbsp;<strong>No es correcto, mira la respuesta abajo</strong>';
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
  document.getElementById('feedback-banner').className = 'feedback-banner hidden';
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
    document.getElementById('feedback-banner').className = 'feedback-banner hidden';
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
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.update());
    });
  }
});
